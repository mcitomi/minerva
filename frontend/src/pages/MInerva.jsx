import { Container, Row, Col, Button, Form, Image } from "react-bootstrap";

import "../styles/main.css";

export default () => {
    return (
        <Container>
            <Row>
                <Col>
                    <Image src="./assets/images/" alt="MInerva kép"></Image>
                </Col>
                <Col>
                    <Form>
                        <Form.Control type="text" placeholder="Kérdezz bátran Minervától..."></Form.Control>
                        <Button variant="warning">Küldés</Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}