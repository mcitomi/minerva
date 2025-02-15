import { Container, Row, Col, Button, Form, Image } from "react-bootstrap";

import "../styles/main.css";

export default () => {
    return (
        <Container>
            <Row>
                <Col sx={12} md={4}>
                    <Image src="./assets/images/" alt="MInerva kép"></Image>
                </Col>
                <Col sx={12} md={8}>
                    <Form>
                        <Form.Control type="text" placeholder="Kérdezz bátran Minervától..."></Form.Control>
                        <Button variant="warning" className="mt-2">Küldés</Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}