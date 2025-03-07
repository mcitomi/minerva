import { Container, Nav, Navbar, Image, NavDropdown } from "react-bootstrap";
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
                        <NavDropdown title="Beszélgess!" id="basic-nav-dropdown" className="link" style={{fontSize: "20px"}}>
                            <NavDropdown title="Magyar nyelv és irodalom" className="link" style={{fontSize: "20px"}}>
                                <NavDropdown.Item as={Link} to="/petofi-sandor" className="link" style={{fontSize: "20px"}} onClick={handleLinkClick}>Petőfi Sándor</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="/kolcsey-ferenc" className="link" style={{fontSize: "20px"}} onClick={handleLinkClick}>Kölcsey Ferenc</NavDropdown.Item>
                            </NavDropdown>
                            <NavDropdown title="Matematika" className="link" style={{fontSize: "20px"}}>
                                <NavDropdown.Item as={Link} to="/bolyai-janos" className="link" style={{fontSize: "20px"}} onClick={handleLinkClick}>Bolyai János</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="/neumann-janos" className="link" style={{fontSize: "20px"}} onClick={handleLinkClick}>Neumann János</NavDropdown.Item>
                            </NavDropdown>
                            <NavDropdown title="Történelem" className="link" style={{fontSize: "20px"}}>
                                <NavDropdown.Item as={Link} to="/szent-istvan" className="link" style={{fontSize: "20px"}} onClick={handleLinkClick}>Szent István</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="/szechenyi-istvan" className="link" style={{fontSize: "20px"}} onClick={handleLinkClick}>Széchenyi István</NavDropdown.Item>
                            </NavDropdown>
                            <NavDropdown.Divider />
                            <NavDropdown.Item as={Link} to="/minerva" className="link" style={{fontSize: "20px"}} onClick={handleLinkClick}>MInerva</NavDropdown.Item>
                        </NavDropdown>
                        <Nav.Link as={Link} to="/myprofile" className="link" style={{fontSize: "20px"}} onClick={handleLinkClick}>Fiókom</Nav.Link>
                        <Nav.Link as={Link} to="/" className="link" style={{fontSize: "20px"}}>Kijelentkezés</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
                <Image 
                    src={isDarkMode ? "./assets/images/mode/lightmode.svg" : "./assets/images/mode/darkmode.svg"} 
                    alt="Sötét világos mód" onClick={toggleMode} 
                    style={{cursor: "pointer", width: 20}}></Image>
                <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={handleToggle}></Navbar.Toggle>
            </Container>
        </Navbar>
    );
}