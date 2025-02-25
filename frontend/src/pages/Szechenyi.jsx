import { Container, Row, Col, Button, Form, Image } from "react-bootstrap";

import "../styles/main.css";

export default () => {
    return (
        <Container>
            <Row>
                <Col sx={12} md={4}>
                    <Image src="./assets/images/szechenyi.png" alt="Széchenyi István kép" fluid></Image>
                </Col>
                <Col sx={12} md={8}>
                    <Form>
                        <Form.Control type="text" placeholder="Kérdezz bátran Széchenyi Istvántól..."></Form.Control>
                        <Button variant="warning" className="mt-2" style={{fontFamily: 'Pacifico', fontSize: "20px"}}>Küldés</Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}