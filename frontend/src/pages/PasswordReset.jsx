import { Container, Row, Col, Button, FloatingLabel, Form } from "react-bootstrap";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import CONFIG from "../config.json";


// PEM kulcs => ArrayBuffer
function pemToArrayBuffer(pem) {
    const b64 = pem.replace(/-----BEGIN PUBLIC KEY-----/, "")
                   .replace(/-----END PUBLIC KEY-----/, "")
                   .replace(/\s+/g, "");
    return Uint8Array.from(atob(b64), (char) => char.charCodeAt(0)).buffer;
}

export default ({ onLoginSuccess }) => {
    const navigate = useNavigate();
    const [publicKeyPem, setPublicKey] = useState(null);
    const [formData, setFormData] = useState({
        password: '',
        confirmPassword: ''
    });

    // lekéri a publikus kulcsot
    async function fetchPublicKey() {
        try {
            const response = await fetch(`${CONFIG.API_URL}/auth/pk`);
            const data = await response.json();
            const decodedKey = atob(data.encodedKey);
            setPublicKey(decodedKey);
        } catch (error) {
            console.error("API error, unable to get public key: ", error);
        }
    }

    if (!publicKeyPem) {
        fetchPublicKey();
    }

    // kezeli az input mezők változását
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // Jelszó titkosítása és mentése
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!publicKeyPem) {
            console.error('Public key is not available.');
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            alert("A jelszavak nem egyeznek!");
            return;
        }

        const publicKeyBuffer = pemToArrayBuffer(publicKeyPem);

        const publicKey = await window.crypto.subtle.importKey(
            "spki",
            publicKeyBuffer,
            { name: "RSA-OAEP", hash: "SHA-512" },
            true,
            ["encrypt"]
        ).catch(e => {
            console.error("Import key error: ", e);
            return;
        });

        const encodedPassword = new TextEncoder().encode(formData.password);

        const encrypted = await window.crypto.subtle.encrypt(
            { name: "RSA-OAEP" },
            publicKey,
            encodedPassword
        );

        const encryptedPasswordBase64 = btoa(String.fromCharCode(...new Uint8Array(encrypted)));

        try {
            const response = await fetch(`${CONFIG.API_URL}/auth/save-password`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ password: encryptedPasswordBase64 }),
            });

            const result = await response.json();

            if (result.success) {
                alert("Jelszó sikeresen elmentve!");
                navigate("/login");
            } else {
                alert(result.message || "Hiba történt a jelszó mentésekor.");
            }
        } catch (error) {
            console.error("Error saving password: ", error);
        }
    };

    // Jelszó visszaállítás
    async function resetPassword() {
        const email = formData.email;
        const response = await fetch(`${CONFIG.API_URL}/auth/reset-password`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, verifyUrl: `${window.location.origin}` }),
        });

        const result = await response.json();
        alert(result.message);
    }

    return (
        <Container fluid className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
            <Row className="w-100 justify-content-center">
                <Col sx={12} md={6} style={{ backgroundColor: "#d3eefdc7", paddingTop: 30, paddingBottom: 30, color: "#212529" }}>
                    <Form onSubmit={handleSubmit}>
                        <FloatingLabel controlId="floatingPassword" label="Jelszó" className="mb-3 floating-label">
                            <Form.Control type="password" placeholder="Jelszó" name="password" value={formData.password} onChange={handleChange} required />
                        </FloatingLabel>
                        <FloatingLabel controlId="floatingConfirmPassword" label="Jelszó megint" className="mb-3 floating-label">
                            <Form.Control type="password" placeholder="Jelszó" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />
                        </FloatingLabel>
                        <div className="text-center">
                            <Button variant="warning" type="submit" style={{ marginLeft: 10, fontFamily: 'Pacifico', fontSize: "20px" }} className="mt-2">
                                Jelszó mentése
                            </Button>
                        </div>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};
