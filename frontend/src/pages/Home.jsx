import { Container, Row, Col, Button, Image } from "react-bootstrap";

import CarouselCompontent from "../components/Carousel";

import "../styles/splash-texts.css";
import "../styles/main.css";

export default () => {
    return (
        <>
            <Container fluid>
                <CarouselCompontent/>
            </Container>
            <Container>
            <Row style={{ marginTop: '80px', marginBottom: '80px' }}>
                <Col className="splash">
                    <h2>Bátor?</h2>
                    <p>Bizonyára tudod, hogy a görögök Pallasz Athénének hívják, míg a rómaiak Minervának a bölcsesség istennőjét. De tudod, hogy hogyan kapta a nevét?</p>
                </Col>
                <Col className="splash">
                    <h2>Okos?</h2>
                    <p>A “Pallasz” jelző fegyverforgatót jelent, amit a harcok közben is igazságot szolgáltató Minervára utalt. A név köthető a szűzieségéhez és még egy nimfához is.</p>
                </Col>
                <Col className="splash">
                    <h2>Bölcs?</h2>
                    <p>Az istennő Zeusz legkedvesebb gyermeke, hiszen az ő fejéből pattant ki. Minerva tettre készen, teljes fegyverzetben született meg. Ez aztán a nem szokványos!</p>
                </Col>
            </Row>
            <p>Felkeltette érdeklődésedet? Tudj meg többet róla!</p>
            <Button variant="warning">Kattints ide!</Button>
            <Image src="./assets/images/video.png" alt="Videó" className="kep"/>
            <Row>
                <Col>
                    <p>...mert gyors és egyszerű kezelni kicsiknek és nagyoknak egyaránt</p>
                </Col>
                <Col>
                    <p>...mert tanulhatsz vele mobiltelefonon, tableten és számítógépen is</p>
                </Col>
                <Col>
                    <p>...mert megismerheted a történelmi személyeket más korszakokból</p>
                </Col>
                <Col>
                    <p>...mert érettségi centrikus tanítással tanít, így garantált a siker</p>
                </Col>
            </Row>
            <Row>
                <Col>
                    <img src="./assets/images/earth.gif" alt="Gif" />
                </Col>
                <Col>
                    <h2>Célunk</h2>
                    <ul>
                        <li>a jobb eredmények</li>
                        <li>az egyszerűbb tanulás</li>
                        <li>a figyelemzavar csökkentése</li>
                        <li>a nehézségekkel küszködő gyerekek segítése</li>
                        <li>több platform összevonása</li>
                        <li>a természet megóvása (papír dolgozat csökkentése)</li>
                        <li>az időutazás élménye</li>
                    </ul>
                </Col>
            </Row>
        </Container>
        </>
    );
}