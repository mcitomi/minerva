import { Container, Row, Col, Button, FloatingLabel, Form, Image } from "react-bootstrap";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import SuccessAlert from "../components/SuccessAlert.jsx";
import ErrorAlert from "../components/ErrorAlert.jsx";

import CONFIG from "../config.json";

// PEM kulcs => ArrayBuffer
function pemToArrayBuffer(pem) {
    const b64 = pem.replace(/-----BEGIN PUBLIC KEY-----/, "")
        .replace(/-----END PUBLIC KEY-----/, "")
        .replace(/\s+/g, "");
    return Uint8Array.from(atob(b64), (char) => char.charCodeAt(0)).buffer;
}

export default () => {
    const navigate = useNavigate();
    const [publicKeyPem, setPublicKey] = useState(null);
    const [formData, setFormData] = useState({
        password: '',
        confirmPassword: ''
    });

    const [errorMessage, setErrorMessage] = useState(null);
    const [showErrorAlert, setShowErrorAlert] = useState(false);
    const [successMessage, setSuccessMessage] = useState(null);
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);

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
            setErrorMessage("A jelszó nem egyezik!");
            setShowErrorAlert(true);
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

        if (!encryptedPasswordBase64) {
            console.error('Encryption failed.');
            return;
        }

        try {
            const response = await fetch(`${CONFIG.API_URL}/auth/password-reset`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ "password": encryptedPasswordBase64, "code": new URLSearchParams(window.location.search).get("code") }),
            });

            const result = await response.json();

            if (response.ok) {
                setSuccessMessage("Jelszó módosítva! Átirányítjuk 5 másodperc múlva...");
                setShowSuccessAlert(true);
                setTimeout(() => {
                    navigate("/login");
                }, 5000);
            } else {
                if (result.message[0].includes("invalid")) {
                    setErrorMessage("Ez a visszaállítási kérelem lejárt! Kérjen új emailt.");
                    setShowErrorAlert(true);
                    return;
                }

                if (result.message[0].includes("Weak")) {
                    setErrorMessage("A jelszónak legalább 8 karakter hosszúnak kell lennie, és tartalmaznia kell legalább egy nagybetűt, egy kisbetűt, egy számot és egy speciális karaktert (@$!%?&).");
                    setShowErrorAlert(true);
                    return;
                }

                setErrorMessage("Nem sikerült megváltoztatni a jelszót!");
                setShowErrorAlert(true);
                return;
            }
        } catch (error) {
            setErrorMessage("Nem sikerült megváltoztatni a jelszót!");
            setShowErrorAlert(true);
            console.error("Error saving password: ", error);
        }
    };

    return (
        <Container fluid>
            <Row style={{ paddingRight: "20px", paddingLeft: "20px" }}>
                <Col xs={12} md={6} style={{ paddingTop: 20 }}>
                    <Image src="./assets/images/resetpassword.gif" alt="Dekor kép" style={{ borderRadius: "30px" }} fluid></Image>
                </Col>
                <Col xs={12} md={6} className="inputForm" style={{ paddingTop: 30, paddingBottom: 30, color: "#212529", marginTop: "20px", borderRadius: "30px" }}>
                    <h2 className="mt-5 mb-5 pt-5">Jelszó módosítás</h2>
                    <Form onSubmit={handleSubmit}>
                        <FloatingLabel label="Jelszó" className="mb-3 floating-label">
                            <Form.Control type="password" placeholder="Jelszó" name="password" value={formData.password} onChange={handleChange}></Form.Control>
                        </FloatingLabel>
                        <FloatingLabel label="Jelszó újra" className="mb-3 floating-label">
                            <Form.Control type="password" placeholder="Jelszó újra" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange}></Form.Control>
                        </FloatingLabel>
                        <div className="text-center">
                            <Button variant="warning" type="submit" style={{ marginLeft: 10, fontFamily: 'Pacifico', fontSize: "20px" }} className="mt-2">
                                Jelszó mentése
                            </Button>
                        </div>
                        {showErrorAlert && <ErrorAlert title={"Sikertelen mentés!"} text={errorMessage} setOriginStatus={setShowErrorAlert} />}
                        {showSuccessAlert && <SuccessAlert title={"Sikeres mentés!"} text={successMessage} setOriginStatus={setShowSuccessAlert} />}
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};
