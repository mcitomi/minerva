import { Container, Row, Col, Form, FloatingLabel, Button, Image,  } from "react-bootstrap";
import React, {useRef, useState} from "react";

import "../styles/main.css";

export default () => {
    const fileInputRef = useRef(null);
    const [image, setImage] = useState("./assets/images/user.png"); 

    // fájl kiválasztást kezeli
    const handleFileSelect = () => {
        fileInputRef.current.click();
    };

    //kép frissítés
    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result); 
            };
            reader.readAsDataURL(file); // beolvassa a fájlt
        }
    };
    return (
        <Container fluid>
            <Row>
                <Col sx={12} md={8} style={{backgroundColor: "#d3eefdc7", paddingTop: 30, paddingBottom: 30, color: "#212529"}}>
                    <h3 style={{marginBottom: 30}}>Adataim</h3>
                    <Form>
                        <FloatingLabel controlId="floatingInput" label="Név" className="mb-3">
                            <Form.Control type="name" placeholder="Név"></Form.Control>
                        </FloatingLabel>
                        <FloatingLabel controlId="floatingInput" label="Email cím" className="mb-3">
                            <Form.Control type="email" placeholder="Email cím"></Form.Control>
                        </FloatingLabel>
                        <FloatingLabel controlId="floatingPassword" label="Jelszó" className="mb-3">
                            <Form.Control type="password" placeholder="Jelszó"></Form.Control>
                        </FloatingLabel>
                        <Row>
                            <Col>
                                <FloatingLabel controlId="floatingInput" label="Ország" className="mb-3">
                                    <Form.Control type="text" placeholder="Ország"></Form.Control>
                                </FloatingLabel>
                            </Col>
                            <Col>
                                <FloatingLabel controlId="floatingInput" label="Irányítószám" className="mb-3">
                                    <Form.Control type="number" placeholder="Irányítószám"></Form.Control>
                                </FloatingLabel>
                            </Col>
                            <Col>
                                <FloatingLabel controlId="floatingInput" label="Település" className="mb-3">
                                    <Form.Control type="text" placeholder="Település"></Form.Control>
                                </FloatingLabel>
                            </Col>
                        </Row>
                        <FloatingLabel controlId="floatingInput" label="Cím" className="mb-3">
                            <Form.Control type="text" placeholder="Cím"></Form.Control>
                        </FloatingLabel>
                        <div className="text-center">
                            <Button variant="warning" type="submit" style={{marginRight: 10, fontFamily: 'Pacifico', fontSize: "20px"}} className="mt-2">Módosítás</Button>
                            <Button variant="warning" type="submit" style={{marginLeft: 10, fontFamily: 'Pacifico', fontSize: "20px"}} className="mt-2">Mentés</Button>
                        </div>
                    </Form>
                </Col>
                <Col sx={12} md={4} style={{paddingTop: 30, paddingBottom: 30}}>
                    <h3 style={{marginBottom: 30}}>Profilkép</h3>
                    <div className="d-flex justify-content-center">
                        <div style={{ borderRadius: "50%", overflow: "hidden", width: "400px", height: "400px", border: "#699fcb 5px solid" }} className="mt-2 mb-2">
                            <Image src={image} alt="Profilkép" fluid style={{ height: "100%", width: "100%", objectFit: "cover" }}/>
                        </div>
                    </div>
                    <div className="text-center">
                        <Button variant="warning" type="submit"  onClick={handleFileSelect}  style={{marginRight: 10, fontFamily: 'Pacifico', fontSize: "20px"}} className="mt-2">Módosítás</Button>

                        <Button variant="warning" type="submit"  style={{marginLeft: 10, fontFamily: 'Pacifico', fontSize: "20px"}} className="mt-2">Mentés</Button>
                    </div>
                </Col>
            </Row>
            <input
                ref={fileInputRef}
                type="file"
                style={{ display: "none" }}
                accept="image/*" 
                onChange={handleImageChange}
            />
        </Container>
    );
}