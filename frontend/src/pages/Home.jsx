import { Container, Row, Col, Button, Image, Collapse } from "react-bootstrap";
import { useState } from 'react';

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
            <Row className="mt-5 mb-5" style={{color: "#212529"}}>
                <Col className="splash">
                    <ColData 
                        title={"Bátor?"} 
                        paragraph={"Bizonyára tudod, hogy a görögök Pallasz Athénének hívják, míg a rómaiak Minervának a bölcsesség istennőjét. De tudod, hogy hogyan kapta a nevét?"}></ColData>
                </Col>
                <Col className="splash">
                    <ColData 
                        title={"Okos?"} 
                        paragraph={"A “Pallasz” jelző fegyverforgatót jelent, amit a harcok közben is igazságot szolgáltató Minervára utalt. A név köthető a szűzieségéhez és még egy nimfához is."}></ColData>
                </Col>
                <Col className="splash">
                    <ColData 
                        title={"Bölcs?"} 
                        paragraph={"Az istennő Zeusz legkedvesebb gyermeke, hiszen az ő fejéből pattant ki. Minerva tettre készen, teljes fegyverzetben született meg. Ez aztán a nem szokványos!"}></ColData>
                </Col>
            </Row>
            <p>Felkeltette érdeklődésedet? Tudj meg többet róla!</p>
            <div className="text-center" style={{marginBottom: 50}}>
                <Information></Information>
            </div>
            <Image src="./assets/images/video.png" alt="Videó" fluid />
            <h1 style={{marginTop: 50, marginBottom: 30}}>Miért válaszd a MInervát?</h1>
            <Row style={{color: "#212529"}}>
                <Col className="splash">
                    <Paragraph text={"...mert gyors és egyszerű kezelni kicsiknek és nagyoknak egyaránt"}></Paragraph>
                </Col>
                <Col className="splash">
                    <Paragraph text={"...mert tanulhatsz vele mobiltelefonon, tableten és számítógépen is"}></Paragraph>
                </Col>
                <Col className="splash">
                    <Paragraph text={"...mert megismerheted a történelmi személyeket más korszakokból"}></Paragraph>
                </Col>
                <Col className="splash">
                    <Paragraph text={"...mert érettségi centrikus tanítással tanít, így garantált a siker"}></Paragraph>
                </Col>
            </Row>
            <Row className="mt-3">
                <Col className="text-center">
                    <Image src="./assets/images/earth.gif" alt="Gif" fluid />
                </Col>
                <Col>
                    <h2>Célunk</h2>
                    <ul id="ikon">
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

function ColData({ title, paragraph }) {
    return (
        <>
            <h2 style={{marginTop: 80, marginBottom: 30}}>{title}</h2>
            <p>{paragraph}</p>
        </>
    );
}

function Paragraph({ text }) {
    return(
        <p style={{marginTop: 120}}>{text}</p>
    );
}

function Information() {
    const [open, setOpen] = useState(false);

    return (
        <>
            <Button onClick={() => setOpen(!open)} aria-controls="information" aria-expanded={open} variant="warning">Kattints ide!</Button>
            <Collapse in={open}>
                <div id="information" className="mt-2">
                    <p>Bizonyára nem tudtad, de Pallasz Athénének különböző jelképei vannak. Általában karddal, lándzsával, sisakkal és gorgósfős mellvérttel ábrázolják. Mellvértjét másképpen pajzsát Zeusz készítette Héphaisztosszal.</p>
                    <p>Athéné szent állata a bagoly volt, amit a bölcsességgel és tudással párosítunk. Oltama alatt álltak a városok, amely közül az első Athén volt.</p>             
                </div>
            </Collapse>
        </>
    );
}