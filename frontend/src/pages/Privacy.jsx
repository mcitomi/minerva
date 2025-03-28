import React from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';

import "../styles/main.css";

export default () => {
    return (
       <Container>
            <h2 className="mt-3">MInerva datvédelmi szabályzata</h2>
            <Row className="mt-5 mb-5">
                <Col xs={12} md={12} className="text-center">
                    <h3>Bevezetés</h3>
                    <p style={{textAlign: "justify"}}>Üdvözöljük a Minerva "Bátor? Okos? Bölcs?" adatvédelmi oldalán! Elkötelezettek vagyunk az Ön személyes adatainak védelme iránt. Ez az Adatvédelmi Szabályzat részletesen ismerteti, hogyan gyűjtjük, használjuk fel, osztjuk meg és védjük az Ön személyes adatait, amikor igénybe veszi szolgáltatásainkat. Szolgáltatásaink használatával Ön elfogadja az Adatvédelmi Szabályzat feltételeit.</p>
                    <Image src="./assets/images/privacy.png" alt="Dekor kép" fluid className="mb-4" style={{borderRadius:"30px", maxWidth: "1000px"}}></Image>
                </Col>
                <Col xs={12} md={12}>
                    <h3>Az általunk gyűjtött információk</h3>
                    <Row className="mt-5 mb-5">
                        <Col xs={12} md={6}>
                            <h4>Ön által megadott információk</h4>
                            <ul id="ikon" style={{textAlign: "justify"}}>
                                <li><strong>Fiókadatok:</strong> Regisztráció során olyan információkat kérünk Öntől, mint név, e-mail cím, telefonszám, opcionálisan iskolájának neve.</li>
                                <li><strong>Felhasználói tartalom:</strong> Az Ön által a fórumon közzétett publikus üzenetek és egyéb tartalmak, amelyek a Minerva Discord szerverén is megjelenhetnek a "fórum" csatornában.</li>
                            </ul>
                        </Col>
                        <Col xs={12} md={6}>
                            <h4>Automatikusan gyűjtött információk</h4>
                            <ul id="ikon" style={{textAlign: "justify"}}>
                                <li><strong>Profilkép:</strong> Az Ön által feltöltött profilképet base64 kódolással tároljuk.</li>
                                <li><strong>Nyelvi beállítások:</strong> Az Ön által preferált nyelvet rögzítjük a jobb felhasználói élmény érdekében.</li>
                                <li><strong>Ország:</strong> Az Ön által megadott ország nevét tároljuk.</li>
                            </ul>
                        </Col>
                    </Row>
                </Col>
                <Col xs={12} md={12}>
                    <h3>Az információk felhasználása</h3>
                    <p style={{textAlign: "justify"}}>Az általunk gyűjtött személyes adatokat a következő célokra használjuk fel:</p>
                    <ol style={{textAlign: "justify"}}>
                        <li><strong>Szolgáltatásnyújtás és fejlesztés:</strong> Fiókjának kezelése, szolgáltatásaink működtetése és fejlesztése.</li>
                        <li><strong>Személyre szabás:</strong> Az Ön preferenciái alapján testreszabott élmény nyújtása.</li>
                        <li><strong>Biztonság és integritás:</strong> Rendszerünk biztonságának fenntartása és visszaélések megelőzése.</li>
                    </ol>
                </Col>
                <Col xs={12} md={12}>
                    <Row className="mt-5 mb-5">
                        <Col xs={12} md={4}>
                            <h3>Az információk megosztása</h3>
                            <p style={{textAlign: "justify"}}>Személyes adatait nem adjuk ki harmadik feleknek. Minden adatot saját, Oracle Cloud VPS-en tárolunk, és kizárólag a MInerva belső működéséhez használjuk fel. A fórumon közzétett üzenetek azonban elérhetőek a Minerva Discord szerverén a "fórum" csatornában.</p>
                        </Col>
                        <Col xs={12} md={4}>
                            <h3>Adatmegőrzés és inaktiválás</h3>
                            <p style={{textAlign: "justify"}}>Személyes adatait mindaddig megőrizzük, amíg fiókja aktív. Lehetősége van fiókja inaktiválására, melynek során adatai elérhetetlenné válnak más felhasználók számára, kivéve a fórumon közzétett publikus üzeneteit, amelyek továbbra is láthatóak maradnak a weboldalon és a Minerva Discord szerverén az ön nevével együtt.</p>
                        </Col>
                        <Col xs={12} md={4}>
                            <h3>Adatbiztonság</h3>
                            <p style={{textAlign: "justify"}}>Az Ön adatainak védelme érdekében RSA titkosítást és hashelést alkalmazunk. Bár minden ésszerű lépést megteszünk adatai védelme érdekében, az interneten keresztüli adatátvitel soha nem lehet teljesen biztonságos.</p>
                        </Col>
                    </Row>
                </Col>
                <Col xs={12} md={12}>
                    <h3>Gyermekek adatainak védelme</h3>
                    <p style={{textAlign: "justify"}}>Szolgáltatásaink gyermekek számára is elérhetőek. Kiemelten fontos számunkra a fiatal felhasználók adatainak védelme, ezért különös figyelmet fordítunk adatkezelési gyakorlataink során a gyermekek személyes adatainak biztonságára.</p>
                </Col>
                <Col xs={12} md={12}>
                    <h3 className="mt-3">Az Ön jogai</h3>
                    <ul id="ikon" style={{textAlign: "justify"}}>
                        <li><strong>Hozzáférhet</strong> személyes adataihoz.</li>
                        <li><strong>Helyesbítheti</strong> pontatlan vagy hiányos adatait.</li>
                        <li><strong>Kérheti adatai törlését vagy inaktiválását.</strong> Felhívjuk figyelmét, hogy a fórumon közzétett publikus üzenetek a fiók inaktiválása után is láthatóak maradnak.</li>
                        <li><strong>Adathordozhatóságot kérhet,</strong> amennyiben ez technikailag megvalósítható.</li>
                    </ul>
                </Col>
                <Col xs={12} md={12}>
                    <Row className="mt-5 mb-5">
                        <Col xs={12} md={6}>
                            <h3>Kapcsolatfelvétel</h3>
                            <p style={{textAlign: "justify"}}>Adatvédelmi gyakorlatainkkal kapcsolatos kérdéseivel forduljon hozzánk bizalommal az alábbi elérhetőségen:</p>
                            <p style={{textAlign: "justify"}}><strong>E-mail:</strong> <a href="mailto:support@edu-minerva.hu">support@edu-minerva.hu</a></p>
                        </Col>
                        <Col xs={12} md={6}>
                            <h3>A szabályzat módosításai</h3>
                            <p style={{textAlign: "justify"}}>Fenntartjuk a jogot jelen Adatvédelmi Szabályzat módosítására. A változásokról megfelelő időben értesítjük felhasználóinkat.</p>
                            <p style={{textAlign: "justify"}}><strong>Utolsó frissítés:</strong> 2025. március 27.</p>
                        </Col>
                    </Row>
                </Col>
            </Row>
       </Container>
    )
}