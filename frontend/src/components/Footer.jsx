import { Container, Row, Col, Image } from "react-bootstrap";

import "../styles/footer.css";

export default () => {
    return (
        <Container fluid className="hatter">
            <Row>
                <Col>
                    <h3>Elérhetőségeink:</h3>
                    <ul className="footerList">
                        <li><Image src="./assets/images/location.svg" alt="Location" style={{width: 20}}></Image> 3047, Buják Alkotmány utca 16.</li>
                        <li><Image src="./assets/images/phone.svg" alt="Phone" style={{width: 20}}></Image> +36 30 119 2885</li>
                        <li><Image src="./assets/images/email.svg" alt="E-mail" style={{width: 20}}></Image> minerva.bob@gmail.com</li>
                        <li><Image src="./assets/images/discord.svg" alt="Discord" style={{width: 20}}></Image> minerva.bob</li>
                    </ul>
                </Col>
                <Col>
                    <h3>Kövess minket!</h3>
                    <ul className="footerList">
                        <li><Image src="./assets/images/facebook.svg" alt="Facebook" style={{width: 20}}></Image> MInerva - Bátor? Okos? Bölcs?</li>
                        <li><Image src="./assets/images/instagram.svg" alt="Instagram" style={{width: 20}}></Image> @minerva.bob</li>
                    </ul>
                </Col>
            </Row>
        </Container>
    );
}