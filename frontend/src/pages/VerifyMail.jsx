import { Container, Button } from "react-bootstrap";
import CONFIG from "../config.json";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SuccessAlert from "../components/SuccessAlert.jsx";
import ErrorAlert from "../components/ErrorAlert.jsx";

import Content from "../components/Content.jsx";
import "../styles/main.css";

export default () => {
    const verifyToken = new URLSearchParams(new URL(window.location.href).search).get("code");

    const navigate = useNavigate();

    const [isCodeValid, setPageStatus] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);
    const [showErrorAlert, setShowErrorAlert] = useState(false);
    const [successMessage, setSuccessMessage] = useState(null);
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);

    async function verify(token) {
        const response = await fetch(`${CONFIG.API_URL}/auth/verify-mail/link?code=${token}`);
    
        if(response.ok) {
            successMessage("Sikeres megerősítés! 5 másodperc múlva átirányítjuk...");
            showSuccessAlert(true);
            setTimeout(() => {
                navigate("/login");
            }, 3000);
        } else {
            errorMessage("Sikertelen megerősítés!")
            showErrorAlert(true);
        }
    }
    
    async function deny(token) {
        const response = await fetch(`${CONFIG.API_URL}/auth/verify-mail/remove?code=${token}`);
    
        if(response.ok) {
            successMessage("Sikeres törlés! 5 másodperc múlva átirányítjuk...")
            showSuccessAlert(true);
            setTimeout(() => {
                navigate("/");
            }, 5000);
        } else {
            errorMessage("Sikertelen törlés!")
            showErrorAlert(true);
        }
    }

    useEffect(() => {
        async function checkToken() {
            const response = await fetch(`${CONFIG.API_URL}/auth/verify-mail/check?code=${verifyToken}`);

            if (!response.ok) {
                setPageStatus(false);
            }
        }
        checkToken();
    }, [])


    return (
        <Container style={{marginBottom: 30}}>
            <Content 
                title={"Megerősíti regisztrációját?"} 
                paragraph={isCodeValid ? "A regisztráció véglegesítéséhez kérem nyomjon a megerősítés gombra." : "Ezt a regiszrációs kódot már megerősítették vagy törölték!"}
                img={"./assets/images/warning.png "}></Content>
            <div className="text-center">
                {isCodeValid 
                ? 
                <>
                <Button variant="warning" style={{marginRight: 10, fontFamily: 'Pacifico', fontSize: "20px"}} onClick={() => verify(verifyToken)}>Megerősítés</Button>
                <Button variant="warning" style={{marginLeft: 10, fontFamily: 'Pacifico', fontSize: "20px", color: "black"}} onClick={() => deny(verifyToken)}>Törlés</Button>
                </>
                : ""
                }
                {showErrorAlert && <ErrorAlert title={"Sikertelen mentés!"} text={errorMessage} setOriginStatus={setShowErrorAlert} />}
                {showSuccessAlert && <SuccessAlert title={"Sikeres mentés!"} text={successMessage} setOriginStatus={setShowSuccessAlert} />}
            </div>
        </Container>
    )
}