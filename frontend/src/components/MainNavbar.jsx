import { Container, Nav, Navbar, Image } from "react-bootstrap";
import { Link } from "react-router-dom"

import "../styles/nav.css";

export default ({ toggleMode, isDarkMode }) => {
    return (
        <Navbar expand="lg" sticky="top">
            <Container>
                <Navbar.Brand as={Link} to="/" className="link" style={{fontSize: "25px"}}>Főoldal</Navbar.Brand>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/about" className="link" style={{fontSize: "20px"}}>Rólunk</Nav.Link>
                        <Nav.Link as={Link} to="/registration" className="link" style={{fontSize: "20px"}}>Regisztráció</Nav.Link>
                        <Nav.Link as={Link} to="/login"  className="link" style={{fontSize: "20px"}}>Bejelentkezés</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
                <Image 
                    src={isDarkMode ? "/assets/images/lightmode.svg" : "/assets/images/darkmode.svg"} 
                    alt="Sötét világos mód" onClick={toggleMode} 
                    style={{cursor: "pointer", width: 20}}></Image>
                <Navbar.Toggle aria-controls="basic-navbar-nav" ></Navbar.Toggle>
            </Container>
        </Navbar>
    );
}