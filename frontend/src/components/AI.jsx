import React, { useRef, useState, useEffect } from "react";
import { Container, Row, Col, Button, Form, Image, InputGroup, FloatingLabel } from "react-bootstrap";
import CONFIG from "../config.json";

import "../styles/ai.css";

export default ({ img, altText, title, placeholderText, personName }) => {
    
    const inputRef = useRef(null);
    const chatRef = useRef(null);

    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const token = localStorage.getItem("token");

    if (!token) {
        window.location.href = "/login";
        return;
    }

    async function fetchPersonPost(e) {
        /*
        function updateHistory(question, answer) {
            const newHistory = [...history];
            newHistory.push({
                "role": "user", 
                "parts" : [{"text" : question}]
            });
            newHistory.push({
                "role": "model", 
                "parts" : [{"text" : answer}]
            });
            console.log(newHistory);
                
            setHistory(newHistory);
        }
        */

        e.preventDefault();

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
            }
        ];

        setHistory(newHistory);
        inputRef.current.value = "";

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
                        history: newHistory
                    })
                }
            );

            if (!response.ok) {
                switch (response.status) {
                    case 400:
                        throw new Error("Hiba a lekérésben!");
                    case 401:
                    case 403:
                        throw new Error("Lejárt a munkamenet, jelentkezz be újra!");
                    case 429:
                        throw new Error("Túl sok kérés, próbálja újra később!");
                    case 500:
                        throw new Error("Szerveroldali hiba!");
                }
            }

            const resData = await response.json();

            setHistory(prevHistory => [
                ...prevHistory,
                {
                    "role": "model",
                    "parts": [
                        {
                            "text": resData.model
                        }
                    ]
                }
            ]);

            //updateHistory(question, resData.model);
            //inputRef.current.value = "";
            // nem csak egy választ raksz be, hanem
            // lemásolod, belerakod az új kérdést ÉS választ is, utána cserélsz
        }
        catch (err) {
            setError(err.message)
        }
        setLoading(false);
    }

    useEffect(() => {
        if (chatRef.current) {
            chatRef.current.scrollTop = chatRef.current.scrollHeight;
        }
    }, [history]);

    // useState: előző kérdéseknek, válaszok [{"question": ..., "answer": ...}, ....]
    // kiírás: messages.map((msg) => {
    //  - kiírod a kérdést (msg.question)
    //  - válasz (msg.answer)
    // });
    return (
        <Container fluid>
            <Row>
                <Col sx={12} md={6}>
                    <Image src={img} alt={altText} fluid></Image>
                </Col>
                <Col sx={12} md={6}>
                    <h2 className="mt-3 mb-3">{title}</h2>
                    <div className="box">
                        <div className="chat" ref={chatRef}>
                            {history.map((elem) => {
                                if (elem.role == "user") {
                                    return (
                                        <>
                                            <div className="user">{elem.parts[0].text}</div>
                                        </>
                                    );
                                } else {
                                    return (
                                        <>
                                            <div className="ai">{elem.parts[0].text}</div>
                                        </>
                                    );
                                }
                            })}
                        </div>
                    </div>
                    <Form className="mt-3" onSubmit={fetchPersonPost}>
                        <InputGroup>
                            <FloatingLabel controlId="floatingInput" label={placeholderText} className="floating-label">
                                <Form.Control
                                    type="text"
                                    placeholder={placeholderText}
                                    id="question"
                                    ref={inputRef}
                                    autoComplete="off" />
                            </FloatingLabel>
                            <Button variant="warning" style={{ fontFamily: 'Pacifico', fontSize: "20px" }} type="submit">Küldés</Button>
                        </InputGroup>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}