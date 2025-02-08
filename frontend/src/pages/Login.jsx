import { Container, Row, Col, Button, FloatingLabel, Form, Image } from "react-bootstrap";

import "../styles/main.css";

export default () => {
    return (
        <Container>
            <Row>
                <Col>
                    <Image src="./assets/images/" alt="Dekor kép"></Image>
                </Col>
                <Col style={{backgroundColor: "#d3eefd", paddingTop: 30, paddingBottom: 30}}>
                    <h2 style={{marginBottom: 30}}>Bejelentkezés</h2>
                    <Form>
                        <FloatingLabel controlId="floatingInput" label="Email-cím" className="mb-3">
                            <Form.Control type="email" placeholder="Email-cím"></Form.Control>
                        </FloatingLabel>
                        <FloatingLabel controlId="floatingPassword" label="Jelszó" className="mb-3">
                            <Form.Control type="password" placeholder="Jelszó"></Form.Control>
                        </FloatingLabel>
                        <div className="text-center">
                        <Button variant="warning" type="submit" style={{marginRight: 10}}>Elfelejtettem a jelszavamat</Button>
                        <Button variant="warning" type="submit" style={{marginLeft: 10}}>Belépés</Button>
                        </div>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}