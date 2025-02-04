import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom"
import "../styles/main.css";

export default () => {
    return (
        <Container style={{marginBottom: 30}}>
            <h1 style={{marginTop: 30}}>Upszi! Valami hiba történt!</h1>
            <p>Keresésed során rossz végpontot adtál meg. Térj vissza a főoldalra!</p>
            <div className="text-center">
                <Button variant="warning" as={Link} to="/">Főoldal</Button>
            </div>
        </Container>
    );
}