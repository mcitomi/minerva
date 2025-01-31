import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom"

export default () => {
    return (
        <Navbar expand="lg"  style={{backgroundColor: "#263557"}}>
            <Container>
                <div style={{display: "inline-block"}}>
                <Navbar.Brand as={Link} to="/" style={{backgroundColor: "#ffbd59", borderTopRightRadius: 10, borderBottomRightRadius: 10}}>Főoldal</Navbar.Brand>
               <div>
                <Navbar.Toggle aria-controls="basic-navbar-nav" ></Navbar.Toggle>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <div>
                            <Nav.Link as={Link} to="/about" style={{backgroundColor:"#d3eefd", borderTopRightRadius: 10, borderBottomRightRadius: 10}}>Rólunk</Nav.Link>
                            <div>
                                <Nav.Link as={Link} to="/login" style={{backgroundColor:"#a7d5fb", borderTopRightRadius: 10, borderBottomRightRadius: 10}} >Belépés</Nav.Link>
                                 <div>
                                    <Nav.Link as={Link} to="/registration" style={{backgroundColor:"#83b8e3", borderTopRightRadius: 10, borderBottomRightRadius: 10}}>Regisztráció</Nav.Link>
                                    <div>
                                         <Nav.Link as={Link} to="/shop" style={{backgroundColor:"#699fcb", borderTopRightRadius: 10, borderBottomRightRadius: 10}}>Vásárlás</Nav.Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Nav>
                    
                </Navbar.Collapse>
                    
                 </div>
                </div>
            </Container>
        </Navbar>
    );
}