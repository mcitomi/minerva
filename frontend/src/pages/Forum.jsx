import { Container, Row, Col, Form, InputGroup, Button, FloatingLabel, Image } from "react-bootstrap";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import "../styles/forum.css";

import CONFIG from "../config.json";
import ForumAlert from "../components/ForumAlert";
import ErrorAlert from "../components/ErrorAlert";

var profileIdsInChat = [];

export default ({ handleLogout, isLogged }) => {
    const navigate = useNavigate();

    const defaultPfpUrl = "./assets/images/user.png";
    const controller = new AbortController();

    const [messages, setMessages] = useState([]);
    const [profiles, setProfiles] = useState([]);
    const [yourName, setYourName] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [showErrorAlert, setShowErrorAlert] = useState(false);

    const chatRef = useRef(null);
    const forumChatRef = useRef(null);
    const sendBtnRef = useRef(null);

    const profileIds = [...new Set(messages.map(x => x.userId))];   // A Set minden duplikált elemet ignorál és nem rak bele a tömbe

    if (profileIds.find(x => !profileIdsInChat.includes(x))) { // csak akkor frissítsül a profilesInChat tömböt, ha vannak uj resztvevők a chatbe
        profileIdsInChat = profileIds;
    }

    const token = localStorage.getItem("token");

    useEffect(() => {
        if (!token) {
            if (isLogged) {
                handleLogout();
            }
            navigate("/login");
            return;
        }
    }, [token, navigate]);

    const sendMessage = async (e) => {
        try {
            e.preventDefault();

            if (!chatRef.current.value || chatRef.current.value == "" || sendBtnRef.current.disabled) return;

            sendBtnRef.current.disabled = true;

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
                if (response.status == 400) {
                    setErrorMessage("Hiba történt!");
                    setShowErrorAlert(true);
                } else if (response.status == 403 || response.status == 401) {
                    if (isLogged) {
                        handleLogout();
                    }
                    navigate("/login");
                    return;
                } else if (response.status == 406) {
                    setErrorMessage("Ne használj ilyen szavakat!");
                    setShowErrorAlert(true);
                } else if (response.status == 500) {
                    setErrorMessage("Szerverhiba történt!");
                    setShowErrorAlert(true);
                } else {
                    setErrorMessage("Ismeretlen történt!");
                    setShowErrorAlert(true);
                }
            }

            setTimeout(() => {
                try {
                    sendBtnRef.current.disabled = false;
                } catch (error) {
                    return;
                }
            }, 3000);   // 3 másodperces slowmode
        } catch (err) {
            // throw new Error("Hiba történt az üzenet küldése közben"); // hiba ide is 
            setErrorMessage("Hiba történt az üzenet küldése közben!");
            setShowErrorAlert(true);
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

            if (response.status == 401 || response.status == 403) {
                if (isLogged) {
                    handleLogout();
                }
                navigate("/login");
                return;
            }

            if (!response.ok) {
                // throw new Error("Hiba az üzenetek lekérdezésében!");
                setErrorMessage("Hiba az üzenetek lekérdezésében!");
                setShowErrorAlert(true);
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

            setErrorMessage("Hiba történt az üzenetek lekérése közben!");
            setShowErrorAlert(true);
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
                    "profileIds": profileIdsInChat
                })
            });

            if (!response.ok) {
                setErrorMessage("Hiba történt a profilok lekérése közben!");
                setShowErrorAlert(true);
                return;
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
            setErrorMessage("Hiba történt a profilok lekérése közben!");
            setShowErrorAlert(true);
            return;
        }
    }

    const writeReply = (name) =>{
        chatRef.current.value = `@${name}: `;
        chatRef.current.focus();
    }

    const waitNewMessage = async () => {
        try {
            const response = await fetch(`${CONFIG.API_URL}/forum/new`, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                signal: controller.signal
            });

            if (!response.ok) {
                setErrorMessage("Nem sikerült üzenetet fogadni!");
                setShowErrorAlert(true);
                return;
            }

            if(response.status == 202) {
                const data = await response.json();
                setMessages((messages) =>
                    messages.filter((message) => message.timeSent !== data.deletableTimestamp)
                );
            }

            if (response.status == 200) {
                const data = await response.json();
                setMessages((messages) => [...messages, data]);
            }

            waitNewMessage(); // a végén újra meghívjuk hogy folyamatosan figyelje az üzeneteket
        } catch (err) {
            console.log("A Timeout Occurred - Network error");
            console.error(err);
        }
    }

    useEffect(() => {
        fetchMessages();
        waitNewMessage();
        
        return () => {
            controller.abort();  // az oldal elhagyásakor megszakítjuk a pending kéréseket
        };
    }, []);

    useEffect(() => {
        fetchProfiles();
    }, [profileIdsInChat]); // ha vannak uj chatelők akkor kérjük le azok profilját

    useEffect(() => {
        setYourName(profiles.find(profile => profile.userId == messages.find(msg => msg.userId == profile.userId && msg.yourMessage)?.userId)?.name);
    }, [profiles]);

    useEffect(() => {
        forumChatRef.current?.scrollTo(0, forumChatRef.current.scrollHeight); // mindig legörget a chat aljára
    }, [messages]);

    function handleInputChange() {
        const textarea = chatRef.current;
        textarea.style.height = "20px";
        textarea.style.height = `${textarea.scrollHeight}px`;
    };

    function handleKeyDown(e) { // Enterre is elküldi az üzenetet (mint az AI oldalakon)
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
                                    return <div key={i} className={(message.yourMessage ? "forumUser" : "forumAnotherUser")}>
                                        <Row>
                                            <Col xs={2} style={{ maxWidth: "50px" }}>
                                                <Image style={{ width: "5vh", height: "5vh", marginRight: "10px" }} src={profiles.find(profile => profile.userId == message.userId)?.pfp ? profiles.find(profile => profile.userId == message.userId)?.pfp : defaultPfpUrl} className="pfp"></Image>
                                            </Col>
                                            <Col xs={10}>
                                                <small style={{ paddingLeft: 10 }}>
                                                    {
                                                        profiles.find(profile => profile.userId == message.userId) ? 
                                                        profiles.find(profile => profile.userId == message.userId)?.name : "[Inactive user]"
                                                    }
                                                </small>
                                                <span style={{textAlign: "right", float: "inline-end"}}>{(!message.yourMessage && profiles.find(profile => profile.userId == message.userId)?.name) && <div onClick={() => writeReply(profiles.find(profile => profile.userId == message.userId)?.name)} id="replyImg"></div>}</span>
                                                {/* 
                                                <span style={{textAlign: "right", float: "inline-end"}}>{(!message.yourMessage && profiles.find(profile => profile.userId == message.userId)?.name) && <div onClick={() => writeReply(`<@${profiles.find(profile => profile.userId == message.userId)?.userId}>`)} id="replyImg"></div>}</span> 
                                                Amennyiben megvalósulna egy teljes cross-platform discord integráció, az a fentebb látható módon valósulna meg, user azonosító alapján. 
                                                */}
                                                <br />
                                                <p style={{ paddingLeft: 10, fontSize: "10px" }}>[{new Date(message.timeSent * 1000).toLocaleString("hu-HU")}]</p>
                                                <p className={(yourName && message.message.trim()?.split('@')[1]?.split(':')[0] == yourName) ? "tagged" : ""} style={{ minWidth: "200px" }}>{message.message}</p>
                                            </Col>
                                        </Row>
                                    </div>
                                })
                            }
                        </div>
                    </div>
                    <Form className="mt-3" onSubmit={sendMessage}>
                        <InputGroup>
                            <FloatingLabel controlId="floatingInput" label="Ide írd az üzeneted..." className="floating-label">
                                <Form.Control
                                    as="textarea"
                                    placeholder="Ide írd az üzeneted..."
                                    autoComplete="off"
                                    ref={chatRef}
                                    onInput={handleInputChange}
                                    onKeyDown={handleKeyDown}
                                    style={{ overflow: "hidden" }} />
                            </FloatingLabel>
                            <Button ref={sendBtnRef} variant="warning" style={{ fontFamily: 'Pacifico', fontSize: "20px" }} type="submit">Küldés</Button>
                        </InputGroup>
                    </Form>
                    {showErrorAlert && <ErrorAlert title={"Hoppá!"} text={errorMessage} setOriginStatus={setShowErrorAlert} />}
                </Col>
            </Row>
            <ForumAlert></ForumAlert>
        </Container>
    );
}