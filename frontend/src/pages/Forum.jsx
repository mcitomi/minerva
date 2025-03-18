import { Container, Row, Col, Form, InputGroup, Button, FloatingLabel } from "react-bootstrap";

import "../styles/forum.css";

export default () => {
    return (
        <Container fluid>
            <Row>
                <Col xs={12}>
                    <h2 className="mt-3 mb-3">Fórum</h2>
                    <div className="forumBox">
                        <div className="forumChat">
                            <div className="forumUser">Szia</div>
                            <div className="forumAnotherUser">Szia</div>
                        </div>
                    </div>
                    <Form className="mt-3">
                        <InputGroup>
                            <FloatingLabel controlId="floatingInput" label="Ide írja üzenetét..." className="floating-label">
                                <Form.Control
                                    as="textarea"
                                    placeholder="Ide írja üzenetét"
                                    autoComplete="off"
                                    style={{ overflow: "hidden" }} />
                            </FloatingLabel>
                            <Button variant="warning" style={{ fontFamily: 'Pacifico', fontSize: "20px" }} type="submit">Küldés</Button>
                        </InputGroup>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}