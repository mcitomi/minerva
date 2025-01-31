import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default () => {
    return (
        <Container>
            <h2>Készítők:</h2>
            <Row>
                <Col>
                    <img src="" alt="Berdó kép" />
                </Col>
                <Col>
                    <h3>Berdó Tamás</h3>
                    <p>Tomi kiváló backend programozó, akinek a weboldal készítés a kisujjában van. Modern technikákkal dolgozik, mindig naprakész.</p>
                    <p>Imádja a macskákat és a programozást. Ő egy igazi „Code Cat”. :3</p>
                    <p>Cicafiú 19 éves, programozó.</p>
                </Col>
            </Row>
            <Row>
                <Col>
                    <h3>Füleki József</h3>
                    <p>Józsi jó frontend programozó és kiváló rajzoló. Modern technikákkal dolgozik, mindig naprakész.</p>
                    <p>Imádja az animációkat. Távol áll tőle az informatika bonyolult világa, de a szíve lelkét beleadja.</p>
                    <p>Jósk 18 éves, rajzoló.</p>
                </Col>
                <Col>
                    <img src="" alt="Füleki kép" />
                </Col>
            </Row>
            <Row>
                <Col>
                    <img src="" alt="Sartner kép" />
                </Col>
                <Col>
                    <h3>Sartner Bettina</h3>
                    <p>Betti kiváló fotós, akinek a fényképezés a kisujjában van. Modern technikákkal dolgozik, mindig naprakész.</p>
                    <p>Imádja a kutyákat és a fényképezést. A programozás bár nem erőssége, de a szíve lelkét beleadja.</p>
                    <p>18 éves, fényképész.</p>
                </Col>
            </Row>
            <h2>Konzulens:</h2>
            <Row>
                <Col>
                    <h3>Molnár Máté Norbert</h3>
                    <p>Komédiás 1 kiváló programozó és vicces tanár. Modern technikákkal dolgozik, mindig naprakész.</p>
                    <p>Imádja a programozást és a focit. Fontos számára, hogy diákjaival meg tudja szerettetni az informatikát és minél többen a szakmájukban dolgozzanak.</p>
                    <p>Máré 21 éves, tanár.</p>
                </Col>
                <Col>
                    <img src="" alt="Molnár kép" />
                </Col>
            </Row>
        </Container>
    );
}