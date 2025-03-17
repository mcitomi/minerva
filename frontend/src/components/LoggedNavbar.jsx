import { Container, Nav, Navbar, Image, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState } from "react";

import "../styles/nav.css";

export default ({ toggleMode, isDarkMode, handleLogout }) => {
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
                                <NavDropdown.Item as={Link} to="/ady-endre" className="link" style={{fontSize: "20px"}} onClick={handleLinkClick}>Ady Endre</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="/arany-janos" className="link" style={{fontSize: "20px"}} onClick={handleLinkClick}>Arany János</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="/babits-mihaly" className="link" style={{fontSize: "20px"}} onClick={handleLinkClick}>Babits Mihály</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="/jozsef-attila" className="link" style={{fontSize: "20px"}} onClick={handleLinkClick}>József Attila</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="/kosztolanyi-dezso" className="link" style={{fontSize: "20px"}} onClick={handleLinkClick}>Kosztolányi Dezső</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="/kolcsey-ferenc" className="link" style={{fontSize: "20px"}} onClick={handleLinkClick}>Kölcsey Ferenc</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="/madach-imre" className="link" style={{fontSize: "20px"}} onClick={handleLinkClick}>Madách Imre</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="/petofi-sandor" className="link" style={{fontSize: "20px"}} onClick={handleLinkClick}>Petőfi Sándor</NavDropdown.Item>
                            </NavDropdown>
                            <NavDropdown title="Matematika" className="link" style={{fontSize: "20px"}}>
                                <NavDropdown.Item as={Link} to="/bolyai-farkas" className="link" style={{fontSize: "20px"}} onClick={handleLinkClick}>Bolyai Farkas</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="/bolyai-janos" className="link" style={{fontSize: "20px"}} onClick={handleLinkClick}>Bolyai János</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="/eotvos-lorand" className="link" style={{fontSize: "20px"}} onClick={handleLinkClick}>Eötvös Lóránd</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="/erdos-pal" className="link" style={{fontSize: "20px"}} onClick={handleLinkClick}>Erdős Pál</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="/klein-gyula" className="link" style={{fontSize: "20px"}} onClick={handleLinkClick}>Klein Gyula</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="/neumann-janos" className="link" style={{fontSize: "20px"}} onClick={handleLinkClick}>Neumann János</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="/polya-gyorgy" className="link" style={{fontSize: "20px"}} onClick={handleLinkClick}>Pólya György</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="/turan-pal" className="link" style={{fontSize: "20px"}} onClick={handleLinkClick}>Turán Pál</NavDropdown.Item>
                            </NavDropdown>
                            <NavDropdown title="Történelem" className="link" style={{fontSize: "20px"}}>
                                <NavDropdown.Item as={Link} to="/horthy-miklos" className="link" style={{fontSize: "20px"}} onClick={handleLinkClick}>Horthy Miklós</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="/hunyadi-janos" className="link" style={{fontSize: "20px"}} onClick={handleLinkClick}>Hunyadi János</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="/kossuth-lajos" className="link" style={{fontSize: "20px"}} onClick={handleLinkClick}>Kossuth Lajos</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="/matyas-kiraly" className="link" style={{fontSize: "20px"}} onClick={handleLinkClick}>Mátyás király</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="/rakoczi-ferenc" className="link" style={{fontSize: "20px"}} onClick={handleLinkClick}>Rákóczi Ferenc</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="/szechenyi-istvan" className="link" style={{fontSize: "20px"}} onClick={handleLinkClick}>Széchenyi István</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="/szent-istvan" className="link" style={{fontSize: "20px"}} onClick={handleLinkClick}>Szent István</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="/zrinyi-miklos" className="link" style={{fontSize: "20px"}} onClick={handleLinkClick}>Zrínyi Miklós</NavDropdown.Item>
                            </NavDropdown>
                            <NavDropdown.Divider />
                            <NavDropdown.Item as={Link} to="/minerva" className="link" style={{fontSize: "20px"}} onClick={handleLinkClick}>MInerva</NavDropdown.Item>
                        </NavDropdown>
                        <Nav.Link as={Link} to="/my-profile" className="link" style={{fontSize: "20px"}} onClick={handleLinkClick}>Fiókom</Nav.Link>
                        <Nav.Link as={Link} to="/" className="link" style={{fontSize: "20px"}} onClick={handleLogout}>Kijelentkezés</Nav.Link>
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