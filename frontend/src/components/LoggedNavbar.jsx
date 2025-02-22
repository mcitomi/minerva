import { Container, Nav, Navbar, Image, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom"

import "../styles/nav.css";

export default ({ toggleMode, isDarkMode }) => {
    return (
        <Navbar expand="lg" sticky="top">
            <Container>
                <Navbar.Brand as={Link} to="/" className="link">Főoldal</Navbar.Brand>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/about" className="link">Rólunk</Nav.Link>
                        <NavDropdown title="Beszélgess!" id="basic-nav-dropdown" className="link">
                            <NavDropdown.Item as={Link} to="/petofi" className="link">Magyar nyelv és irodalom</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/bolyai" className="link">Matematika</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/saint" className="link">Történelem</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item as={Link} to="/minerva" className="link">MInerva</NavDropdown.Item>
                        </NavDropdown>
                        <Nav.Link as={Link} to="/myprofile" className="link">Fiókom</Nav.Link>
                        <Nav.Link className="link">Kijelentkezés</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
                <Image 
                    src={isDarkMode ? "./assets/images/lightmode.svg" : "./assets/images/darkmode.svg"} 
                    alt="Sötét világos mód" onClick={toggleMode} 
                    style={{cursor: "pointer", width: 20}}></Image>
                <Navbar.Toggle aria-controls="basic-navbar-nav" ></Navbar.Toggle>
            </Container>
        </Navbar>
    );
}