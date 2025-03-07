import { Container, Button } from "react-bootstrap";
import CONFIG from "../config.json";
import { useState } from "react";

import Content from "../components/Content.jsx";
import "../styles/main.css";

async function verify(token) {
    const response = await fetch(`${CONFIG.API_URL}/auth/verify-mail/link?mtoken=${token}`);

}

async function deny(token) {
    const response = await fetch(`${CONFIG.API_URL}/auth/verify-mail/remove?mtoken=${token}`);

}

export default () => {
    const verifyToken = new URLSearchParams(new URL(window.location.href).search).get("mtoken");
    // const [pageStatus, setPageStatus] = useState("valid");

    // useEffect(() => {
    //     async function checkToken() {
    //         const response = await fetch(`${CONFIG.API_URL}/auth/verify-mail/check?mtoken=${token}`);

    //         if (!response.ok) {
    //             setPageStatus("invalid");
    //         }
    //     }

    //     checkToken();
    // }, [])


    return (
        <Container style={{marginBottom: 30}}>
            <Content 
                title={"Megerősíti regisztrációját?"} 
                paragraph={"A regisztráció véglegesítéséhez kérem nyomjon a megerősítés gombra."}
                img={"./assets/images/warning.png"}></Content>
            <div className="text-center">
                <Button variant="warning" style={{marginRight: 10, fontFamily: 'Pacifico', fontSize: "20px"}} onClick={() => verify(verifyToken)}>Megerősítés</Button>
                <Button variant="warning" style={{marginLeft: 10, fontFamily: 'Pacifico', fontSize: "20px"}} onClick={() => deny(verifyToken)}>Törlés</Button>
            </div>
        </Container>
    )
}