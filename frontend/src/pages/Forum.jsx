import { Container, Row, Col, Form, InputGroup, Button, FloatingLabel, Image } from "react-bootstrap";
import { useEffect, useRef, useState } from "react";

import "../styles/forum.css";

import CONFIG from "../config.json";

export default () => {
    const defaultPfpUrl = "./assets/images/user.png";

    const [messages, setMessages] = useState([]);
    const [profiles, setProfiles] = useState([]);

    const chatRef = useRef(null);
    const forumChatRef = useRef(null);

    const profileIds = [...new Set(messages.map(x => x.userId))];   // A Set minden duplikált elemet ignorál és nem rak bele a tömbe

    const token = localStorage.getItem("token");

    if (!token) {
        throw new Error("Engedély megtagadva.");
    }

    const sendMessage = async (e) => {
        e.preventDefault();
        try {
            if (!chatRef.current.value || chatRef.current.value == "") return;

            const response = await fetch(`${CONFIG.API_URL}/forum/send`, {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    "message": chatRef.current.value
                })
            });

            chatRef.current.value = "";

            if (!response.ok) {
                throw new Error("Hiba a küldés közben");
            }

            fetchMessages();

        } catch (err) {
            throw new Error("Hiba történt az üzenet küldése közben");
        }
    }

    const fetchMessages = async () => {
        try {
            const response = await fetch(`${CONFIG.API_URL}/forum/messages`, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error("Hiba az üzenetek lekérdezésében!");
            }

            const data = await response.json();

            setMessages(data.map(msg => {
                return {
                    userId: msg.userId,
                    message: msg.message,
                    timeSent: msg.timeSent,
                    yourMessage: msg.yourMessage
                }
            }));

        } catch (err) {
            throw new Error("Hiba történt az üzenetek lekérése közben.");
        }
    }

    const fetchProfiles = async () => {
        try {
            const response = await fetch(`${CONFIG.API_URL}/forum/profiles`, {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    "profileIds": profileIds
                })
            });

            if (!response.ok) {
                throw new Error("Hiba a profilok lekérdezésében!");
            }

            const data = await response.json();

            setProfiles(data.map(profile => {
                return {
                    userId: profile.userId,
                    name: profile.username,
                    pfp: profile.pictureBase64Url
                }
            }));
        } catch (err) {
            throw new Error("Hiba történt a profilok lekérése közben.");
        }
    }

    useEffect(() => {
        fetchMessages();

        // const fetchMessagesTo = setInterval(() => {
        //     fetchMessages();
        // }, 4000);
        // meg kell oldani hogy csak akkor fetchelje újra ha van új üznet, vagy valami módon

        return () => clearInterval(fetchMessagesTo);
    }, [])

    useEffect(() => {
        fetchProfiles();
        forumChatRef.current?.scrollTo(0, forumChatRef.current.scrollHeight);
    }, [messages])

    function handleInputChange() {
        const textarea = chatRef.current;
        textarea.style.height = "20px";
        textarea.style.height = `${textarea.scrollHeight}px`;
    };

    function handleKeyDown(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage(e);
            chatRef.current.style.height = "20px";
        }
    };

    return (
        <Container fluid>
            <Row>
                <Col xs={12}>
                    <h2 className="mt-3 mb-3">Fórum</h2>
                    <div className="forumBox">
                        <div className="forumChat" ref={forumChatRef}>
                            {
                                messages.map((message, i) => {
                                    return <div key={i} className={message.yourMessage ? "forumUser" : "forumAnotherUser"}>
                                        <Row>
                                            <Col xs={2}>
                                                <Image src={profiles.find(profile => profile.userId == message.userId)?.pfp ? profiles.find(profile => profile.userId == message.userId)?.pfp : defaultPfpUrl} className="pfp"></Image>
                                            </Col>
                                            <Col xs={10}>
                                                <small>{profiles.find(profile => profile.userId == message.userId) ? profiles.find(profile => profile.userId == message.userId)?.name : "[Inactive user]"} [{new Date(message.timeSent * 1000).toLocaleString()}]</small>
                                                <p>{message.message}</p>
                                            </Col>
                                        </Row>
                                    </div>
                                })
                            }
                        </div>
                    </div>
                    <Form className="mt-3" onSubmit={sendMessage}>
                        <InputGroup>
                            <FloatingLabel controlId="floatingInput" label="Ide írja üzenetét..." className="floating-label">
                                <Form.Control
                                    as="textarea"
                                    placeholder="Ide írja üzenetét"
                                    autoComplete="off"
                                    ref={chatRef}
                                    onInput={handleInputChange}
                                    onKeyDown={handleKeyDown}
                                    style={{ overflow: "hidden" }} />
                            </FloatingLabel>
                            <Button variant="warning" style={{ fontFamily: 'Pacifico', fontSize: "20px" }} type="submit">Küldés</Button>
                        </InputGroup>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}