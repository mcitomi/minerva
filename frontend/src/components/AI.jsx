import React, { useState } from "react";
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
            const newHistory = history.splice();
            newHistory.push({
                "role":"model", 
                "parts" : [{"text" : resData.model}]
            });
            console.log(newHistory);
            
            setHistory(newHistory); // nem csak egy választ raksz be, hanem
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
                            <div className="user">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda illo dolorem aliquam vero culpa. Assumenda, beatae? Earum exercitationem, rerum accusamus culpa dignissimos aperiam quaerat aspernatur, nesciunt recusandae, error ullam hic!
                                Ducimus eligendi nisi quod qui. Enim quis earum necessitatibus omnis perspiciatis, ea blanditiis porro, fugit pariatur tempore sed quam reprehenderit nulla quae corporis, officia ab. Saepe laboriosam itaque porro tempore!
                                Iusto accusantium hic nostrum iure, aliquid neque reiciendis obcaecati iste inventore sint recusandae aliquam, voluptatibus officia consequuntur deleniti. Obcaecati amet dolorem eveniet debitis harum at, voluptates assumenda repudiandae natus quaerat!
                                Cum dolorem quo quasi laudantium vel consectetur, cupiditate voluptatum doloribus aperiam impedit perferendis delectus dolor reprehenderit eos? Quasi dolores rerum deserunt, minima labore id at animi consequuntur aliquam itaque nam?
                                Dolorum ea impedit eos officia officiis. Dignissimos quam sequi eius neque error blanditiis expedita, modi dicta necessitatibus et eos commodi cum laborum! Asperiores nulla molestias porro deserunt illum error harum?
                            </div>
                            <div className="ai">
                                Próba 2
                            </div>
                        </div>
                    </div>
                    <Form className="mt-3">
                        <InputGroup>
                            <Form.Control
                                type="text"
                                placeholder={placeholderText}
                                id="question"/>
                            <Button variant="warning" style={{ fontFamily: 'Pacifico', fontSize: "20px" }} onClick={fetchPersonPost}>Küldés</Button>
                        </InputGroup>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}