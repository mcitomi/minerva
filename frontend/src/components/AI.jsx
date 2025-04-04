import React, { useRef, useState, useEffect } from "react";
import { Container, Row, Col, Button, Form, Image, InputGroup, FloatingLabel } from "react-bootstrap";
import ReactMarkdown from "react-markdown";
import { useNavigate } from "react-router-dom";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

import CONFIG from "../config.json";
import ErrorAlert from "./ErrorAlert";

import "../styles/ai.css";
import "katex/dist/katex.min.css";

export default ({ img, altText, title, placeholderText, personName, handleLogout, isLogged }) => {
    const inputRef = useRef(null);
    const chatRef = useRef(null);

    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isChatable, setChatable] = useState(false);
    const [error, setError] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [showErrorAlert, setShowErrorAlert] = useState(false);

    const navigate = useNavigate();

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

    async function fetchWelcomeMessage() {
        try {
            const newHistory = [
                {
                    "role": "model",
                    "parts": [
                        {
                            "text": "Éppen gépel..."
                        }
                    ],
                    "typing": true
                }
            ];
    
            setHistory(newHistory);

            const response = await fetch(
                `${CONFIG.API_URL}/gemini-models/chat`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        message: "Üdvözöld a tanulót, mutasd be magad illetve kezdeményezz beszélgetést!",
                        person: personName,
                        history: history
                    })
                }
            );

            if (!response.ok) {
                switch (response.status) {
                    case 400:
                        setErrorMessage("Probáld újra később!");
                        setShowErrorAlert(true);
                        break;
                    case 404:
                        setErrorMessage("Ez a modell jelenleg nem működik!");
                        setShowErrorAlert(true);
                        break;
                    case 401:
                    case 403:
                        if (isLogged) {
                            handleLogout();
                        }
                        navigate("/login");
                        break;
                    case 429:
                        setErrorMessage("Rendszerünk jelenleg túlterhelt, próbálja újra később!");
                        setShowErrorAlert(true);
                        break;
                    case 500:
                        setErrorMessage("Szerver oldali hiba történt!");
                        setShowErrorAlert(true);
                        break;
                }
                return;
            }

            const resData = await response.json();

            if (resData.model) {
                setHistory([
                    {
                        "role": "model",
                        "parts": [
                            {
                                "text": resData.model
                            }
                        ]
                    }
                ]);
            }
            setChatable(true);
        }
        catch (err) {
            setError(err.message)
        }
    }

    async function fetchPersonPost(e) {
        e.preventDefault();

        if(inputRef.current.value == "" || !isChatable) {
            return;
        }

        setChatable(false);

        const question = inputRef.current.value;

        const newHistory = [
            ...history,
            {
                "role": "user",
                "parts": [
                    {
                        "text": question
                    }
                ]
            },
            {
                "role": "model",
                "parts": [
                    {
                        "text": "Éppen gépel..."
                    }
                ],
                "typing": true
            }
        ];

        setHistory(newHistory);
        inputRef.current.value = "";
        inputRef.current.style.height = "20px";

        setLoading(true);
        try {
            const response = await fetch(
                `${CONFIG.API_URL}/gemini-models/chat`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        message: question,
                        person: personName,
                        history: newHistory.filter(msg => !msg.typing)
                    })
                }
            );

            if (!response.ok) {
                switch (response.status) {
                    case 400:
                        setErrorMessage("Probáld újra később!");
                        setShowErrorAlert(true);
                        break;
                    case 404:
                        setErrorMessage("Ez a modell jelenleg nem működik!");
                        setShowErrorAlert(true);
                        break;
                    case 406:
                        setErrorMessage("Ne használj ilyen szavakat!");
                        setShowErrorAlert(true);
                        setHistory(prevHistory => [
                            ...prevHistory.slice(0, -1)
                        ]);
                        setChatable(true);
                        break;
                    case 401:
                    case 403:
                        if (isLogged) {
                            handleLogout();
                        }
                        navigate("/login");
                        break;
                    case 429:
                        setErrorMessage("Rendszerünk jelenleg túlterhelt, próbálja újra később!");
                        setShowErrorAlert(true);
                        inputRef.current.value = question;
                        setHistory(prevHistory => [
                            ...prevHistory.filter(msg => !msg.typing).slice(0, -1)
                        ]);
                        setChatable(true);
                        break;
                    case 500:
                        setErrorMessage("Szerver oldali hiba történt!");
                        setShowErrorAlert(true);
                        break;
                }
                return;
            }

            const resData = await response.json();

            if (resData.model) {
                setHistory(prevHistory => [
                    ...prevHistory.filter(msg => !msg.typing),
                    {
                        "role": "model",
                        "parts": [
                            {
                                "text": resData.model
                            }
                        ]
                    }
                ]);
            }

            setChatable(true);
        }
        catch (err) {
            setError(err.message)
        }
        setLoading(false);
    }

    function handleInputChange() {
        const textarea = inputRef.current;
        textarea.style.height = "20px";
        textarea.style.height = `${textarea.scrollHeight}px`;
    };

    function handleKeyDown(e) {
        if (e.key === 'Enter' && !e.shiftKey && isChatable) {
            e.preventDefault();
            fetchPersonPost(e);
            inputRef.current.style.height = "20px";
        }
    };

    useEffect(() => {
        if (chatRef.current) {
            chatRef.current.scrollTop = chatRef.current.scrollHeight;
        }
    }, [history]);

    useEffect(() => {
        fetchWelcomeMessage();
    }, []);

    return (
        <Container fluid>
            <Row>
                <Col xs={12} md={6} lg={4}>
                    <Image src={img} alt={altText} fluid></Image>
                </Col>
                <Col xs={12} md={6} lg={8}>
                    <h2 className="mt-3 mb-3">{title}</h2>
                    <div className="box">
                        <div className="chat" ref={chatRef}>
                            {history.map((elem, i) => {
                                if (elem.role == "user") {
                                    return (
                                        <div key={i} className="user">{elem.parts[0].text}</div>
                                    );
                                } else {
                                    return (
                                        <div key={i} className="ai">
                                            {
                                                elem.typing ?
                                                    <div className="typing">
                                                        <span>•</span><span>•</span><span>•</span>
                                                    </div>
                                                    :
                                                    <ReactMarkdown children={elem.parts[0].text} remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]} />
                                            }
                                        </div>
                                    );
                                }
                            })}
                        </div>
                    </div>
                    <Form className="mt-3" onSubmit={fetchPersonPost}>
                        <InputGroup>
                            <FloatingLabel label={placeholderText} className="floating-label">
                                <Form.Control
                                    as="textarea"
                                    placeholder={placeholderText}
                                    id="question"
                                    ref={inputRef}
                                    autoComplete="off"
                                    maxLength={2000}
                                    onInput={handleInputChange}
                                    onKeyDown={handleKeyDown}
                                    style={{ overflow: "hidden" }} />
                            </FloatingLabel>
                            <Button variant="warning" style={{ fontFamily: 'Pacifico', fontSize: "20px" }} type="submit" active={isChatable}>Küldés</Button>
                        </InputGroup>
                    </Form>
                    {showErrorAlert && <ErrorAlert title={"Sikertelen művelet!"} text={errorMessage} setOriginStatus={setShowErrorAlert} />}
                    {title === "MInerva" ? <p className="mt-2" style={{ opacity: "0.5", fontStyle: "italic" }}>Figyelem! A mesterséges intelligenciák hibázhatnak! {title} egy fiktív karakter.</p> : <p className="mt-2" style={{ opacity: "0.5", fontStyle: "italic" }}>Figyelem! A mesterséges intelligenciák hibázhatnak! {title} már elhunyt, így a jelenkorral kapcsolatos információi nem pontosak, illetve kitaláltak.</p>}
                </Col>
            </Row>
        </Container>
    );
}