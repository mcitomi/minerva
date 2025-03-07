import { Container, Button, Image } from "react-bootstrap";
import { Link } from "react-router-dom"
import Content from "../components/Content.jsx";

import "../styles/main.css";

export default () => {
    return (
        <Container style={{marginBottom: 30}}>
            <Content 
                title={"Upszi! Valami hiba történt!"} 
                paragraph={"Keresésed során rossz végpontot adtál meg. Térj vissza a főoldalra!"}
                img={"./assets/images/404.png"}></Content>
            <div className="text-center">
                <Button variant="warning" as={Link} to="/" style={{fontFamily: 'Pacifico', fontSize: "20px"}}>Főoldal</Button>
            </div>
        </Container>
    );
}