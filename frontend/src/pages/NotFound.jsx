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
                <Button variant="warning" as={Link} to="/" style={{fontFamily: 'Pacifico', fontSize: "20px"}}>Főoldal</Button>
            </div>
        </Container>
    );
}

function Content({ title, paragraph }) {
    return (
        <>
            <div className="d-flex justify-content-center">
                <Image src="./assets/images/404.png" alt="Dekor kép" fluid></Image>
            </div>
            <h1 style={{marginTop: 30}}>{title}</h1>
            <p>{paragraph}</p>
        </>
    );
}