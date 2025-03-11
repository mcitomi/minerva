import { Container, Row, Col, Button, Form, Image, InputGroup } from "react-bootstrap";

import "../styles/ai.css";

export default ({ img, altText, title, placeholderText, personName }) => {
    return (
        <Container>
            <Row>
                <Col sx={12} md={6}>
                    <Image src={img} alt={altText} fluid></Image>
                </Col>
                <Col sx={12} md={6}>
                    <h2 className="mt-3 mb-3">{title}</h2>
                    <div className="box">
                        <div className="chat"></div>
                    </div>
                    <Form className="mt-3">
                        <InputGroup>
                            <Form.Control
                                type="text"
                                placeholder={placeholderText}/>
                            <Button variant="warning" style={{ fontFamily: 'Pacifico', fontSize: "20px" }}>Küldés</Button>
                        </InputGroup>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}