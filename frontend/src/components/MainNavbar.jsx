import { Container, Nav, Navbar, Image } from "react-bootstrap";
import { Link } from "react-router-dom"
//import { useState } from 'react';

import "../styles/nav.css";

export default () => {
    return (
        <Navbar expand="lg" sticky="top">
            <Container>
                <Navbar.Brand as={Link} to="/" className="link">Főoldal</Navbar.Brand>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/about" className="link">Rólunk</Nav.Link>
                        <Nav.Link as={Link} to="/registration" className="link">Regisztráció</Nav.Link>
                        <Nav.Link as={Link} to="/login"  className="link">Bejelentkezés</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
                <Image src="./assets/images/darklightmode.png" alt="Sötét világos mód"></Image>
                <Navbar.Toggle aria-controls="basic-navbar-nav" ></Navbar.Toggle>
            </Container>
        </Navbar>
    );
}

//Kezdetleges:
/*
function DarkLightMode() {
    const [color, setColor] = useState(1);
    function changeColor() {
        if (color === 1) {
            setColor(2);
        }
        else {
            setColor(1);
        }
    }
    return (
        <></>
    );
}
*/