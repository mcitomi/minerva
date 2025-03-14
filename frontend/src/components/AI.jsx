import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Button, Form, Image, InputGroup } from "react-bootstrap";
import CONFIG from "../config.json";

import "../styles/ai.css";

export default ({ img, altText, title, placeholderText, personName }) => {
    const navigate = useNavigate();

    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    async function fetchPersonPost(e) {
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

        e.preventDefault();
        setLoading(true);
        try {
            // const token = localStorage.getItem("token");
            const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOjEsImV4cCI6MTc0MjExODI2N30.Lk5g96C6tjJiFunvaYC5E7LgeKY-IF0_OeqJEHrbmnI";

            const question = document.getElementById("question").value;

            if (!token) {
                navigate("/login");
            }

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
                        history: history
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

            updateHistory(question, resData.model);
             // nem csak egy választ raksz be, hanem
            // lemásolod, belerakod az új kérdést ÉS választ is, utána cserélsz
        }
        catch (err) {
            setError(err.message)
        }
        setLoading(false);
    }

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
                        <div className="chat">
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
                    <Form className="mt-3">
                        <InputGroup>
                            <Form.Control
                                type="text"
                                placeholder={placeholderText}
                                id="question"
                                onSubmit={fetchPersonPost}
                                />
                            <Button type="submit" variant="warning" style={{ fontFamily: 'Pacifico', fontSize: "20px" }}>Küldés</Button>
                        </InputGroup>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}