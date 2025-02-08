import { Container, Button, Image } from "react-bootstrap";
import { Link } from "react-router-dom"

import "../styles/main.css";

export default () => {
    return (
        <Container style={{marginBottom: 30}}>
            <Content 
                title={"Upszi! Valami hiba történt!"} 
                paragraph={"Keresésed során rossz végpontot adtál meg. Térj vissza a főoldalra!"}></Content>
            <div className="text-center">
                <Button variant="warning" as={Link} to="/">Főoldal</Button>
            </div>
        </Container>
    );
}

function Content({ title, paragraph }) {
    return (
        <>
            <Image src="./assets/images/" alt="Dekor kép"></Image>
            <h1 style={{marginTop: 30}}>{title}</h1>
            <p>{paragraph}</p>
        </>
    );
}