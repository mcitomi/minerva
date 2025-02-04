import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import "../styles/main.css";

export default () => {
    return (
        <Container>
            <Row>
                <Col>
                    <img src="" alt="Dekor kép" />
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