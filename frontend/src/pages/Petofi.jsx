import { Container, Row, Col, Button, Form, Image } from "react-bootstrap";

import "../styles/main.css";

export default () => {
    return (
        <Container>
            <Row>
                <Col sx={12} md={4}>
                    <Image src="./assets/images/ai_characters/petofi.png" alt="Petőfi Sándor kép" fluid></Image>
                </Col>
                <Col sx={12} md={8}>
                    <Form>
                        <Form.Control type="text" placeholder="Kérdezz bátran Petőfi Sándortól..."></Form.Control>
                        <Button variant="warning" className="mt-2" style={{fontFamily: 'Pacifico', fontSize: "20px"}}>Küldés</Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}