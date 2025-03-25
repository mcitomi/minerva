import { Container, Row, Col, Button, FloatingLabel, Form, Image } from "react-bootstrap";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ErrorAlert from "../components/ErrorAlert.jsx";

import CONFIG from "../config.json";

import "../styles/main.css";

function pemToArrayBuffer(pem) {    // 
    const b64 = pem
        .replace(/-----BEGIN PUBLIC KEY-----/, "")
        .replace(/-----END PUBLIC KEY-----/, "")
        .replace(/\s+/g, "");
    return Uint8Array.from(atob(b64), (char) => char.charCodeAt(0)).buffer;
}

export default ({ onLoginSuccess }) => {
    const navigate = useNavigate();
    const [publicKeyPem, setPublicKey] = useState(null);
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const [errorMessage, setErrorMessage] = useState(null);
    const [showErrorAlert, setShowErrorAlert] = useState(false);
    
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
            const response = await fetch(`${CONFIG.API_URL}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ "encryptedData": encryptedBase64, "verifyUrl" : `${window.location.origin}` }), // Titkosított adat elküldése
            });

            const result = await response.json();
            
            // alert(...result.message);

            if (result.jwt) {
                onLoginSuccess(result.jwt);
                navigate('/');
            }
            else {
                setErrorMessage(result.message || "Sikertelen bejelentkezés!");
                setShowErrorAlert(true);
                //alert(result.message || "Sikertelen bejelentkezés!");
            }

        } catch (error) {
            console.error('Error submitting form: ', error);
            setErrorMessage("Hiba történt a bejelentkezés során!");
            setShowErrorAlert(true);
        }
    };

    async function resetPassword() {
        const email = formData.email;

        const response = await fetch(`${CONFIG.API_URL}/auth/password-request`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ "email": email, "verifyUrl" : `${window.location.origin}` })
        });

        const result = await response.json();

        alert(...result.message);
    }

    return (
        <Container fluid>
            <Row>
                <Col sx={12} md={6} style={{ padding: 0 }}>
                    <Image src="./assets/images/login.gif" alt="Dekor kép" fluid></Image>
                </Col>
                <Col sx={12} md={6} style={{ backgroundColor: "#d3eefdc7", paddingTop: 30, paddingBottom: 30, color: "#212529" }}>
                    <h2 className="mt-5 mb-5 pt-5">Bejelentkezés</h2>
                    <Form onSubmit={handleSubmit}>
                        <FloatingLabel controlId="floatingInput" label="Email-cím" className="mb-3 floating-label">
                            <Form.Control type="email" placeholder="Email-cím" name="email" value={formData.email} onChange={handleChange} required></Form.Control>
                        </FloatingLabel>
                        <FloatingLabel controlId="floatingPassword" label="Jelszó" className="mb-3 floating-label">
                            <Form.Control type="password" placeholder="Jelszó" name="password" value={formData.password} onChange={handleChange} required></Form.Control>
                        </FloatingLabel>
                        <div className="text-center">
                            <Button variant="warning" type="button" onClick={resetPassword} style={{ marginRight: 10, fontFamily: 'Pacifico', fontSize: "20px" }} className="mt-2">Elfelejtettem a jelszavamat</Button>
                            <Button variant="warning" type="submit" style={{ marginLeft: 10, fontFamily: 'Pacifico', fontSize: "20px" }} className="mt-2">Belépés</Button>
                        </div>
                        {showErrorAlert && <ErrorAlert title={"Sikertelen bejelentkezés!"} text={errorMessage} />}
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}