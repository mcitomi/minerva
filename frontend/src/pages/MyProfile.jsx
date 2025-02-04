import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Button from "react-bootstrap/Button";
import "../styles/main.css";

export default () => {
    return (
        <Container>
            <h2>Fiókom</h2>
            <Row>
                <Col>
                    <h3>Adataim</h3>
                    <Form>
                        <Row>
                            <Col>
                                <FloatingLabel controlId="floatingInput" label="Vezetéknév" className="mb-3">
                                    <Form.Control type="name" placeholder="Vezetéknév"></Form.Control>
                                </FloatingLabel>
                            </Col>
                            <Col>
                                <FloatingLabel controlId="floatingInput" label="Keresztknév" className="mb-3">
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
                        <Button variant="warning" type="submit">Módosítás</Button>
                        <Button variant="warning" type="submit">Mentés</Button>
                    </Form>
                </Col>
                <Col>
                    <h3>Profilkép</h3>
                    <img src="" alt="Profilkép" />
                    <Button variant="warning" type="submit">Módosítás</Button>
                    <Button variant="warning" type="submit">Mentés</Button>
                </Col>
            </Row>
        </Container>
    );
}