import { Button } from "react-bootstrap";
import CONFIG from "../config.json";
import { useState } from "react";

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
        <>
            
            <h2>Megerősíti regisztrációját?</h2>

            <Button onClick={() => verify(verifyToken)}>Regisztráció megerősítése</Button>
            <Button onClick={() => deny(verifyToken)}>Regisztráció törlése</Button>
        </>
    )
}