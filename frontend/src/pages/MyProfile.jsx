import { Container, Row, Col, Form, FloatingLabel, Button, Image, ThemeProvider,  } from "react-bootstrap";
import React, {useRef, useState, useEffect} from "react";

import CONFIG from "../config.json";

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

    const [isEdit, setIsEdit] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        country: "",
        postcode: "",
        settlement: "",
        address: ""
    });


    useEffect(() => {
        async function fetchProfile() {
            try {
                const token = localStorage.getItem("token");

                if (!token) {
                    throw new Error("Engedély megtagadva.");
                }
                
                const response = await fetch(
                    `${CONFIG.API_URL}/user/profile`,
                    {
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${token}`
                        }
                    }
                );
                
                if (!response.ok) {
                    throw new Error("Hiba az értékek lekérdezésében.");
                }
                
                const data = await response.json();

                setFormData({
                    name: data.user.name,
                    email: data.user.email,
                    password: data.password,    // fun fact: a jelszót nem tárolhatod adatbázisban olyan formában, ami visszafejthető, ezért nem jeleníthető meg
                    country: data.user.country, // illetve ha nincs még beállítva pl az ország, akkor null értéket ad vissza az api, ezt is le kell kezelni
                    postcode: data.user.postCode,
                    settlement: data.user.settlement,
                    address: data.user.address
                });
                setImage(data.user.pictureUrl || "./assets/images/user.png");
            } catch (err) {
                setError(err.message);
            }
            setLoading(false);
        }
        fetchProfile();
    }, []);

    function handleInput(e) {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    function handleClick() {
        setIsEdit(true);
    }
    return (
        <Container fluid>
            <Row>
                <Col sx={12} md={8} style={{backgroundColor: "#d3eefdc7", paddingTop: 30, paddingBottom: 30, color: "#212529"}}>
                    <h3 style={{marginBottom: 30}}>Adataim</h3>
                    <Form>
                        <FloatingLabel controlId="floatingInput" label="Név" className="mb-3 floating-label">
                            <Form.Control type="name" placeholder="Név" value={formData.name} onChange={handleInput} disabled={!isEdit}></Form.Control>
                        </FloatingLabel>
                        <FloatingLabel controlId="floatingInput" label="Email cím" className="mb-3 floating-label">
                            <Form.Control type="email" placeholder="Email cím" value={formData.email} onChange={handleInput} disabled={!isEdit}></Form.Control>
                        </FloatingLabel>
                        <FloatingLabel controlId="floatingPassword" label="Jelszó" className="mb-3 floating-label">
                            <Form.Control type="password" placeholder="Jelszó" value={formData.password} onChange={handleInput} disabled={!isEdit}></Form.Control>
                        </FloatingLabel>
                        <Row>
                            <Col>
                                <FloatingLabel controlId="floatingInput" label="Ország" className="mb-3 floating-label">
                                    <Form.Control type="text" placeholder="Ország" value={formData.country} onChange={handleInput} disabled={!isEdit}></Form.Control>
                                </FloatingLabel>
                            </Col>
                            <Col>
                                <FloatingLabel controlId="floatingInput" label="Irányítószám" className="mb-3 floating-label">
                                    <Form.Control type="number" placeholder="Irányítószám" value={formData.postcode} onChange={handleInput} disabled={!isEdit}></Form.Control>
                                </FloatingLabel>
                            </Col>
                            <Col>
                                <FloatingLabel controlId="floatingInput" label="Település" className="mb-3 floating-label">
                                    <Form.Control type="text" placeholder="Település" value={formData.settlement} onChange={handleInput} disabled={!isEdit}></Form.Control>
                                </FloatingLabel>
                            </Col>
                        </Row>
                        <FloatingLabel controlId="floatingInput" label="Cím" className="mb-3 floating-label">
                            <Form.Control type="text" placeholder="Cím" value={formData.address} onChange={handleInput} disabled={!isEdit}></Form.Control>
                        </FloatingLabel>
                        <div className="text-center">
                            <Button variant="warning" type="submit" style={{marginRight: 10, fontFamily: 'Pacifico', fontSize: "20px"}} className="mt-2" onClick={handleClick}>Módosítás</Button>
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
                        <Button variant="warning" type="submit" onClick={handleFileSelect} style={{marginRight: 10, fontFamily: 'Pacifico', fontSize: "20px"}} className="mt-2">Módosítás</Button>
                        <Button variant="warning" type="submit" style={{marginLeft: 10, marginRight: 10, fontFamily: 'Pacifico', fontSize: "20px"}} className="mt-2">Törlés</Button>
                        <Button variant="warning" type="submit" style={{marginLeft: 10, fontFamily: 'Pacifico', fontSize: "20px"}} className="mt-2">Mentés</Button>
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