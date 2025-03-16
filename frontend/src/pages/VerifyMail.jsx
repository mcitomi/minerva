import { Container, Button } from "react-bootstrap";
import CONFIG from "../config.json";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Content from "../components/Content.jsx";
import "../styles/main.css";

export default () => {
    const verifyToken = new URLSearchParams(new URL(window.location.href).search).get("code");

    const navigate = useNavigate();

    const [isCodeValid, setPageStatus] = useState(true);

    async function verify(token) {
        const response = await fetch(`${CONFIG.API_URL}/auth/verify-mail/link?code=${token}`);
    
        if(response.ok) {
            alert("Sikeres megerősítés! 5 másodperc múlva átirányítjuk...");
            setTimeout(() => {
                navigate("/login");
            }, 3000);
        } else {
            alert((await response.json()).message);
        }
    }
    
    async function deny(token) {
        const response = await fetch(`${CONFIG.API_URL}/auth/verify-mail/remove?code=${token}`);
    
        if(response.ok) {
            alert("Sikeres törlés! 5 másodperc múlva átirányítjuk...");
            setTimeout(() => {
                navigate("/");
            }, 5000);
        } else {
            alert((await response.json()).message);
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
                <Button variant="warning" style={{marginLeft: 10, fontFamily: 'Pacifico', fontSize: "20px"}} onClick={() => deny(verifyToken)}>Törlés</Button>
                </>
                : ""
                }
                
            </div>
        </Container>
    )
}