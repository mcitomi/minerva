import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";

export default () => {
    return (
        <Container>
            <h2>Támogass minket!</h2>
            <p>A támogatásokból befolyt összeg 80%-a jótékony célra fordítjuk, míg a 20%-át az oldal üzemeltetésére.</p>
            <p>Köszönjük!</p>
            <div className="text-center" style={{marginBottom: 30}}>
                <Button variant="warning">Bankkártya</Button>
            </div>
        </Container>
    );
}