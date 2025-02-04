import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "../styles/main.css";

export default () => {
    return (
        <Container>
            <Row>
                <Col>
                    <img src="" alt="MInerva kép" />
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