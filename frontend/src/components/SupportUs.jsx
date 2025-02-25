import { Container, Button } from "react-bootstrap";

export default () => {
    return (
        <Container className="mt-5">
            <Content 
                title={"Támogass minket!"} 
                text1={"A támogatásokból befolyt összeg 80%-a jótékony célra fordítjuk, míg a 20%-át az oldal üzemeltetésére."} 
                text2={"Köszönjük!"}></Content>
            <div className="text-center" style={{marginBottom: 30}}>
                <Button variant="warning" style={{fontFamily: 'Pacifico', fontSize: "20px"}}>Bankkártya</Button>
            </div>
        </Container>
    );
}

function Content({ title, text1, text2 }) {
    return(
        <>
            <h2>{title}</h2>
            <p>{text1}</p>
            <p>{text2}</p>
        </>
    );
}