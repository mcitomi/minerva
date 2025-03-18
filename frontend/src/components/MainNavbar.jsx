import { Container, Nav, Navbar, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState } from "react";

import "../styles/nav.css";

export default ({ toggleMode, isDarkMode }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    const handleLinkClick = () => {
        setIsOpen(false);
    };

    return (
        <Navbar expand="lg" sticky="top">
            <Container>
                <Navbar.Brand as={Link} to="/" className="mainLink" style={{fontSize: "25px"}}>Főoldal</Navbar.Brand>
                <Navbar.Collapse id="basic-navbar-nav" in={isOpen}>
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/about" className="link" style={{fontSize: "20px"}} onClick={handleLinkClick}>Rólunk</Nav.Link>
                        <Nav.Link as={Link} to="/registration" className="link" style={{fontSize: "20px"}} onClick={handleLinkClick}>Regisztráció</Nav.Link>
                        <Nav.Link as={Link} to="/login"  className="link" style={{fontSize: "20px"}} onClick={handleLinkClick}>Bejelentkezés</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
                <Image 
                    src={isDarkMode ? "/assets/images/mode/lightmode.svg" : "/assets/images/mode/darkmode.svg"} 
                    alt="Sötét világos mód" onClick={toggleMode} 
                    style={{cursor: "pointer", width: 20}}></Image>
                <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={handleToggle} className="navbar-dark"></Navbar.Toggle>
            </Container>
        </Navbar>
    );
}