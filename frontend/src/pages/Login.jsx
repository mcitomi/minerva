import { Container, Row, Col, Button, FloatingLabel, Form, Image } from "react-bootstrap";

import "../styles/main.css";

export default () => {
    return (
        <Container fluid>
            <Row>
                <Col sx={12} md={6} style={{ padding: 0 }}>
                    <Image src="./assets/images/login.gif" alt="Dekor kép" fluid></Image>
                </Col>
                <Col sx={12} md={6} style={{backgroundColor: "#d3eefdc7", paddingTop: 30, paddingBottom: 30, color: "#212529"}}>
                    <h2 className="mt-5 mb-5 pt-5">Bejelentkezés</h2>
                    <Form>
                        <FloatingLabel controlId="floatingInput" label="Email-cím" className="mb-3">
                            <Form.Control type="email" placeholder="Email-cím"></Form.Control>
                        </FloatingLabel>
                        <FloatingLabel controlId="floatingPassword" label="Jelszó" className="mb-3">
                            <Form.Control type="password" placeholder="Jelszó"></Form.Control>
                        </FloatingLabel>
                        <div className="text-center">
                        <Button variant="warning" type="submit" style={{marginRight: 10, fontFamily: 'Pacifico', fontSize: "20px"}} className="mt-2">Elfelejtettem a jelszavamat</Button>
                        <Button variant="warning" type="submit" style={{marginLeft: 10, fontFamily: 'Pacifico', fontSize: "20px"}} className="mt-2">Belépés</Button>
                        </div>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}