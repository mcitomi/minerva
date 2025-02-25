import { Container, Nav, Navbar, Image, NavDropdown } from "react-bootstrap";
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
                        <NavDropdown title="Beszélgess!" id="basic-nav-dropdown" className="link" style={{fontSize: "20px"}}>
                            <NavDropdown title="Magyar nyelv és irodalom" className="link" style={{fontSize: "20px"}}>
                                <NavDropdown.Item as={Link} to="/petofi" className="link" style={{fontSize: "20px"}}>Petőfi Sándor</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="/kolcsey" className="link" style={{fontSize: "20px"}}>Kölcsey Ferenc</NavDropdown.Item>
                            </NavDropdown>
                            <NavDropdown title="Matematika" className="link" style={{fontSize: "20px"}}>
                                <NavDropdown.Item as={Link} to="/bolyai" className="link" style={{fontSize: "20px"}}>Bolyai János</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="/neumann" className="link" style={{fontSize: "20px"}}>Neumann János</NavDropdown.Item>
                            </NavDropdown>
                            <NavDropdown title="Történelem" className="link" style={{fontSize: "20px"}}>
                                <NavDropdown.Item as={Link} to="/saint" className="link" style={{fontSize: "20px"}}>Szent István</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="/szechenyi" className="link" style={{fontSize: "20px"}}>Széchenyi István</NavDropdown.Item>
                            </NavDropdown>
                            <NavDropdown.Divider />
                            <NavDropdown.Item as={Link} to="/minerva" className="link" style={{fontSize: "20px"}}>MInerva</NavDropdown.Item>
                        </NavDropdown>
                        <Nav.Link as={Link} to="/myprofile" className="link" style={{fontSize: "20px"}}>Fiókom</Nav.Link>
                        <Nav.Link as={Link} to="/" className="link" style={{fontSize: "20px"}}>Kijelentkezés</Nav.Link>
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