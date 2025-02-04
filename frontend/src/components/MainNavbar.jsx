import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom"
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
                <img src="./assets/images/darklightmode.png" alt="Sötét világos mód" />
                <Navbar.Toggle aria-controls="basic-navbar-nav" ></Navbar.Toggle>
            </Container>
        </Navbar>
    );
}