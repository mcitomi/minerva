import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom"
import "../styles/main.css";

export default () => {
    return (
        <Container>
            <h1>Upszi! Valami hiba történt!</h1>
            <p>Keresésed során rossz végpontot adtál meg. Térj vissza a főoldalra!</p>
            <Button variant="warning" as={Link} to="/">Főoldal</Button>
        </Container>
    );
}