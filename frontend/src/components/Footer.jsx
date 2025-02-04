import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "../styles/footer.css";

export default () => {
    return (
        <Container fluid className="hatter">
            <Row>
                <Col>
                    <h3>Elérhetőségeink:</h3>
                    <ul>
                        <li>telephely: 3047, Buják Alkotmány utca 16.</li>
                        <li>telefon: +36 30 119 2885</li>
                        <li>e-mail: minerva.bob@gmail.com</li>
                        <li>discord: minerva.bob</li>
                    </ul>
                </Col>
                <Col>
                    <h3>Kövess minket:</h3>
                    <ul>
                        <li>facebook: MInerva - Bátor? Okos? Bölcs?</li>
                        <li>instagram: @minerva.bob</li>
                    </ul>
                </Col>
            </Row>
        </Container>
    );
}