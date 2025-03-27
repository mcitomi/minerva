import { Container, Row, Col, Image } from "react-bootstrap";

import Carousel from "../components/Carousel.jsx";
import ColData from "../components/ColData.jsx";
import Paragraph from "../components/Paragraph.jsx";
import Information from "../components/Information.jsx";
import Video from "../components/Video.jsx";

import "../styles/splash-texts.css";
import "../styles/main.css";

export default () => {
    return (
        <>
            <Container fluid style={{ padding: 0 }}>
                <Carousel />
            </Container>
            <Container>
                <Row className="mt-5 mb-5 d-flex justify-content-center align-items-center text-center">
                    <Col xs={12} md={4} className="splash d-flex align-items-center justify-content-center text-center">
                        <ColData
                            title={"Bátor?"}
                            paragraph={"Bizonyára tudod, hogy a görögök Pallasz Athénének hívják, míg a rómaiak Minervának a bölcsesség istennőjét. De tudod, hogy hogyan kapta a nevét?"}></ColData>
                    </Col>
                    <Col xs={12} md={4} className="splash d-flex align-items-center justify-content-center text-center">
                        <ColData
                            title={"Okos?"}
                            paragraph={"A “Pallasz” jelző fegyverforgatót jelent, amit a harcok közben is igazságot szolgáltató Minervára utalt. A név köthető a szűzieségéhez és még egy nimfához is."}></ColData>
                    </Col>
                    <Col xs={12} md={4} className="splash d-flex align-items-center justify-content-center text-center">
                        <ColData
                            title={"Bölcs?"}
                            paragraph={"Az istennő Zeusz legkedvesebb gyermeke, hiszen az ő fejéből pattant ki. Minerva tettre készen, teljes fegyverzetben született meg. Ez aztán a nem szokványos!"}></ColData>
                    </Col>
                </Row>
                <p>Felkeltette érdeklődésedet? Tudj meg többet róla!</p>
                <div className="text-center" style={{ marginBottom: 50 }}>
                    <Information></Information>
                </div>
                <Video></Video>
                <h1 style={{ marginTop: 50, marginBottom: 30 }}>Miért válaszd a MInervát?</h1>
                <Row className="d-flex justify-content-center align-items-center text-center">
                    <Col xs={12} md={3} className="splash d-flex align-items-center justify-content-center text-center">
                        <Paragraph text={"...mert gyors és egyszerű kezelni kicsiknek és nagyoknak egyaránt"}></Paragraph>
                    </Col>
                    <Col xs={12} md={3} className="splash d-flex align-items-center justify-content-center text-center">
                        <Paragraph text={"...mert tanulhatsz vele mobiltelefonon, tableten és számítógépen is"}></Paragraph>
                    </Col>
                    <Col xs={12} md={3} className="splash d-flex align-items-center justify-content-center text-center">
                        <Paragraph text={"...mert megismerheted a történelmi személyeket más korszakokból"}></Paragraph>
                    </Col>
                    <Col xs={12} md={3} className="splash d-flex align-items-center justify-content-center text-center">
                        <Paragraph text={"...mert érettségi centrikus tanítással tanít, így garantált a siker"}></Paragraph>
                    </Col>
                </Row>

                <Row className="mt-3">
                    <Col sx={12} md={6} className="text-center">
                        <Image src="./assets/images/earth.gif" alt="Gif" fluid />
                    </Col>
                    <Col sx={12} md={6} className="d-flex justify-content-center align-items-center">
                        <div>
                            <h2 style={{ marginBottom: 30 }}>Célunk</h2>
                            <ul id="ikon">
                                <li>a jobb eredmények</li>
                                <li>az egyszerűbb tanulás</li>
                                <li>a figyelemzavar csökkentése</li>
                                <li>a nehézségekkel küszködő gyerekek segítése</li>
                                <li>több platform összevonása</li>
                                <li>a természet megóvása (papír dolgozat csökkentése)</li>
                                <li>az időutazás élménye</li>
                            </ul>
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    );
}