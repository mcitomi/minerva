import { Container, Row, Col, Image } from "react-bootstrap";
import { Link } from 'react-router-dom';

import "../styles/footer.css";

export default () => {
    return (
        <Container fluid className="hatter">
            <Row>
                <Col sx={12} md={6}>
                    <h3 style={{ color: "#212529" }}>Elérhetőségeink:</h3>
                    <ul className="footerList" style={{ color: "#212529" }}>
                        <li><Image src="./assets/images/footer/location.svg" alt="Location" style={{ width: 20 }}></Image> 2170, Aszód Hatvani út 3.</li>
                        <li><Image src="./assets/images/footer/phone.svg" alt="Phone" style={{ width: 20 }}></Image> +36 70 123 4567</li>
                        <li><Image src="./assets/images/footer/email.svg" alt="E-mail" style={{ width: 20 }}></Image> support@edu-minerva.hu</li>
                        <li><a href="https://dc.edu-minerva.hu/" target="_blank"><Image src="./assets/images/footer/discord.svg" alt="Discord" style={{ width: 20 }}></Image> Csatlakozz a discord szerverünköz!</a></li>
                    </ul>
                </Col>
                <Col sx={12} md={6}>
                    <h3 style={{ color: "#212529" }}>Kövess minket!</h3>
                    <ul className="footerList" style={{ color: "#212529" }}>
                        <li><a href="https://www.facebook.com/" target="_blank"><Image src="./assets/images/footer/facebook.svg" alt="Facebook" style={{ width: 20 }}></Image> MInerva - Bátor? Okos? Bölcs?</a></li>
                        <li><a href="https://www.instagram.com/" target="_blank"><Image src="./assets/images/footer/instagram.svg" alt="Instagram" style={{ width: 20 }}></Image> @eduminerva.bob</a></li>
                    </ul>
                    <Link id="privacy" to="/privacy" style={{ textDecoration: 'none', color: 'inherit' }}><h4> Adatvédelmi tájékoztató</h4></Link>
                    <p style={{fontSize: 12}}> {(new Date).getFullYear()} &copy; Minden jog fenntartva</p>
            </Col>
        </Row>
        </Container >
    );
}