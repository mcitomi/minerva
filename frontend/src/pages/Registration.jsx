import React, { useState } from "react";
import { Container, Form, Button, Col, Row, FloatingLabel, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import SuccessAlert from "../components/SuccessAlert.jsx";
import ErrorAlert from "../components/ErrorAlert.jsx";

import "../styles/main.css";

import CONFIG from "../config.json";

// az API_URL után írjuk az adott endpointot, ami a backend fogad. (Ez nem változik) Az endpointot a backend adja meg, rossz endpoint esetén 404-es státusszal visszatér.

function pemToArrayBuffer(pem) {    // 
    const b64 = pem
        .replace(/-----BEGIN PUBLIC KEY-----/, "")
        .replace(/-----END PUBLIC KEY-----/, "")
        .replace(/\s+/g, "");
    return Uint8Array.from(atob(b64), (char) => char.charCodeAt(0)).buffer;
}

export default () => {
    const navigate = useNavigate();
    const [publicKeyPem, setPublicKey] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        passwordre: ''
    });

    const [errorMessage, setErrorMessage] = useState(null);
    const [showErrorAlert, setShowErrorAlert] = useState(false);
    const [successMessage, setSuccessMessage] = useState(null);
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    

    async function fetchPublicKey() {
        try {
            const response = await fetch(`${CONFIG.API_URL}/auth/pk`);
            const data = await response.json();

            const decodedKey = atob(data.encodedKey); // base64 decode https://www.w3schools.com/jsref/met_win_atob.asp
            setPublicKey(decodedKey);
        } catch (error) {
            console.error("API error, unable to get public key: ", error);
        }
    }

    if(!publicKeyPem) {
        fetchPublicKey();
    }

    const handleChange = (e) => {   //  Mikor írunk valamit az inputba, frissül
        const { name, value } = e.target;   // kikérjük az inputból a nevet és értéket (property)
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!publicKeyPem) {
            console.error('Public key is not available.');
            return;
        }

        const formDataString = JSON.stringify(formData);

        // Form titkosítása publikus kulccsal
        // Maximum 374 karakter lehet a titkosítandó szöveg hossza (RSA-3072)
        // https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto

        const publicKeyBuffer = pemToArrayBuffer(publicKeyPem); // A backendről kapott pem kulcsot spki kulccsá alakítjuk, mert a böngészőbe épített crypto modul ezt tudja használni.

        const publicKey = await window.crypto.subtle.importKey(
            "spki",                     // Key format
            publicKeyBuffer,            // Key data
            { name: "RSA-OAEP", hash: "SHA-512" }, // Algorithm SHA-512 használunk 
            true,                       // Extractable
            ["encrypt"]                 // Usages
        ).catch(e => {
            console.error("Import key error: ", e);
            return;
        });

        // A böngészőbe épített crypto modult használjuk titkosításra, így nem kell külső npm-et használni. ~ Nagyjából 2015 julius óta támogatják a böngészők
        const encryptedData = await window.crypto.subtle.encrypt(
            { name: "RSA-OAEP" },
            publicKey,
            new TextEncoder().encode(formDataString) // string to Uint8Array
        ).catch(e => {
            console.error("Encrypt error: (string length is ok? 374)", e);
            return;
        });

        const encryptedBase64 = btoa(   // string to base64
            String.fromCharCode(...new Uint8Array(encryptedData))
        );

        if (!encryptedBase64) {
            console.error('Encryption failed.');
            return;
        }

        try {
            const response = await fetch(`${CONFIG.API_URL}/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ "encryptedData": encryptedBase64, "verifyUrl" : `${window.location.origin}` }), // Titkosított adat elküldése
            });

            const result = await response.json();
            
            if (!response.ok) {
                if(response.status == 400) {
                    if(result.message[0].includes("Weak")) {
                        setErrorMessage("A jelszónak legalább 8 karakter hosszúnak kell lennie, és tartalmaznia kell legalább egy nagybetűt, egy kisbetűt, egy számot és egy speciális karaktert (@$!%?&).")
                        setShowErrorAlert(true);
                    } else if (result.message[0].includes("do not match")) {
                        setErrorMessage("A jelszavak nem egyeznek!");
                        setShowErrorAlert(true);
                    } else if (result.message[0].includes("format")) {
                        setErrorMessage("Hibás email adat!");
                        setShowErrorAlert(true);
                    } else {
                        setErrorMessage("Hibás bemeneti adat!");
                        setShowErrorAlert(true);
                    }
                } else if(response.status == 409) {
                    setErrorMessage("Ezzel az email címmel már regisztráltak!");
                    setShowErrorAlert(true);
                } else if (response.status == 500) {
                    setErrorMessage("Szerverhiba történt!");
                    setShowErrorAlert(true);
                } else {
                    setErrorMessage("Hiba történt!");
                    setShowErrorAlert(true);
                }
            } else {
                setSuccessMessage("Sikeres regisztráció!");
                setShowSuccessAlert(true);
                navigate('/login');
            }
        } catch (error) {
            console.error('Error submitting form: ', error);
            setErrorMessage("Hiba történt a regisztráció során!");
            setShowErrorAlert(true);
        }
    };

    return (
        <Container fluid>
            <Row style={{paddingRight: "20px", paddingLeft: "20px"}}>
                <Col xs={12} md={6} style={{ paddingTop: 20}}>
                    <Image src="./assets/images/registration.gif" alt="Dekor kép" style={{borderRadius:"30px"}} fluid></Image>
                </Col>
                <Col xs={12} md={6} className="inputForm" style={{ paddingTop: 30, paddingBottom: 30, color: "#212529", marginTop: "20px", borderRadius:"30px"}}>
                    <h2 className="mt-5 mb-5 pt-5">Regisztráció</h2>
                    <Form onSubmit={handleSubmit}>
                        <FloatingLabel controlId="floatingInput" label="Név" className="mb-3 floating-label">
                            <Form.Control type="text" placeholder="Név" name="name" value={formData.name} onChange={handleChange} required></Form.Control>
                        </FloatingLabel>
                        <FloatingLabel controlId="floatingInput" label="Email-cím" className="mb-3 floating-label">
                            <Form.Control type="email" placeholder="Email-cím" name="email" value={formData.email} onChange={handleChange} required></Form.Control>
                        </FloatingLabel>
                        <Row>
                            <Col xs={12} md={6}>
                                <FloatingLabel controlId="floatingPassword" label="Jelszó" className="mb-3 floating-label">
                                    <Form.Control type="password" placeholder="Jelszó" name="password" value={formData.password} onChange={handleChange} required></Form.Control>
                                </FloatingLabel>
                            </Col>
                            <Col xs={12} md={6}>
                                <FloatingLabel  controlId="floatingPassword" label="Jelszó újra" className="mb-3 floating-label">
                                    <Form.Control type="password" placeholder="Jelszó újra" name="passwordre" value={formData.passwordre} onChange={handleChange} required></Form.Control>
                                </FloatingLabel>
                            </Col>
                        </Row>
                        <div className='text-center'>
                            <Button variant="warning" type="submit" className="mt-2" style={{fontFamily: 'Pacifico', fontSize: "20px"}}>Regisztrálás</Button>
                        </div>
                        {showErrorAlert && <ErrorAlert title={"Sikertelen regisztráció!"} text={errorMessage} setOriginStatus={setShowErrorAlert}/>}
                        {showSuccessAlert && <SuccessAlert title={"Sikeres regisztráció!"} text={successMessage} setOriginStatus={setShowSuccessAlert}/>}
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};
