import { Container, Row, Col, Form, FloatingLabel, Button, Image } from "react-bootstrap";

import "../styles/main.css";

export default () => {
    return (
        <Container fluid>
            <Row>
                <Col sx={12} md={8} style={{backgroundColor: "#d3eefd", paddingTop: 30, paddingBottom: 30, color: "#212529"}}>
                    <h3 style={{marginBottom: 30}}>Adataim</h3>
                    <Form>
                        <Row>
                            <Col>
                                <FloatingLabel controlId="floatingInput" label="Vezetéknév" className="mb-3">
                                    <Form.Control type="name" placeholder="Vezetéknév"></Form.Control>
                                </FloatingLabel>
                            </Col>
                            <Col>
                                <FloatingLabel controlId="floatingInput" label="Keresztnév" className="mb-3">
                                    <Form.Control type="name" placeholder="Keresztnév"></Form.Control>
                                </FloatingLabel>
                            </Col>
                        </Row>
                        <FloatingLabel controlId="floatingInput" label="Email cím" className="mb-3">
                            <Form.Control type="email" placeholder="Email cím"></Form.Control>
                        </FloatingLabel>
                        <FloatingLabel controlId="floatingPassword" label="Jelszó" className="mb-3">
                            <Form.Control type="password" placeholder="Jelszó"></Form.Control>
                        </FloatingLabel>
                        <Row>
                            <Col>
                                <FloatingLabel controlId="floatingInput" label="Ország" className="mb-3">
                                    <Form.Control type="text" placeholder="Ország"></Form.Control>
                                </FloatingLabel>
                            </Col>
                            <Col>
                                <FloatingLabel controlId="floatingInput" label="Irányítószám" className="mb-3">
                                    <Form.Control type="number" placeholder="Irányítószám"></Form.Control>
                                </FloatingLabel>
                            </Col>
                            <Col>
                                <FloatingLabel controlId="floatingInput" label="Település" className="mb-3">
                                    <Form.Control type="text" placeholder="Település"></Form.Control>
                                </FloatingLabel>
                            </Col>
                        </Row>
                        <FloatingLabel controlId="floatingInput" label="Cím" className="mb-3">
                            <Form.Control type="text" placeholder="Cím"></Form.Control>
                        </FloatingLabel>
                        <div className="text-center">
                            <Button variant="warning" type="submit" style={{marginRight: 10, fontFamily: 'Pacifico', fontSize: "20px"}} className="mt-2">Módosítás</Button>
                            <Button variant="warning" type="submit" style={{marginLeft: 10, fontFamily: 'Pacifico', fontSize: "20px"}} className="mt-2">Mentés</Button>
                        </div>
                    </Form>
                </Col>
                <Col sx={12} md={4} style={{paddingTop: 30, paddingBottom: 30}}>
                    <h3 style={{marginBottom: 30}}>Profilkép</h3>
                    <div className="text-center">
                        <Image src="./assets/images/user.png" alt="Gif" fluid />
                    </div>
                    <div className="text-center">
                        <Button variant="warning" type="submit" style={{marginRight: 10, fontFamily: 'Pacifico', fontSize: "20px"}} className="mt-2">Módosítás</Button>
                        <Button variant="warning" type="submit" style={{marginLeft: 10, fontFamily: 'Pacifico', fontSize: "20px"}} className="mt-2">Mentés</Button>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}