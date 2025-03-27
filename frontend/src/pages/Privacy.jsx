import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import "../styles/main.css";
import "../styles/privacy.css";

export default () => {
    return (
        <Container>
            <h1 className='privacytitle'>MInerva ADATVÉDELMI SZABÁLYZAT</h1>

            <h2 className='privacy2'>1. Bevezetés</h2>
            <p className='privacyp'>Üdvözöljük a Minerva "Bátor? Okos? Bölcs?" adatvédelmi oldalán! Elkötelezettek vagyunk az Ön személyes adatainak védelme iránt. Ez az Adatvédelmi Szabályzat részletesen ismerteti, hogyan gyűjtjük, használjuk fel, osztjuk meg és védjük az Ön személyes adatait, amikor igénybe veszi szolgáltatásainkat. Szolgáltatásaink használatával Ön elfogadja az Adatvédelmi Szabályzat feltételeit.</p>

            <h2 className='privacy2'>2. Az általunk gyűjtött információk</h2>
            <h4 className='privacy4'>2.1. Ön által megadott információk</h4>
            <ul>
                <li><strong>Fiókadatok:</strong> Regisztráció során olyan információkat kérünk Öntől, mint név, e-mail cím, telefonszám, opcionálisan iskolájának neve.</li>
                <li><strong>Felhasználói tartalom:</strong> Az Ön által a fórumon közzétett publikus üzenetek és egyéb tartalmak.</li>
            </ul>

            <h4 className='privacy4'>2.2. Automatikusan gyűjtött információk</h4>
            <ul>
                <li><strong>Profilkép:</strong> Az Ön által feltöltött profilképet base64 kódolással tároljuk.</li>
                <li><strong>Nyelvi beállítások:</strong> Az Ön által preferált nyelvet rögzítjük a jobb felhasználói élmény érdekében.</li>
                <li><strong>Ország:</strong> Az Ön által megadott ország nevét tároljuk.</li>
            </ul>

            <h2 className='privacy2'>3. Az információk felhasználása</h2>
            <p className='privacyp'>Az általunk gyűjtött személyes adatokat a következő célokra használjuk fel:</p>
            <ol>
                <li><strong>Szolgáltatásnyújtás és fejlesztés:</strong> Fiókjának kezelése, szolgáltatásaink működtetése és fejlesztése.</li>
                <li><strong>Személyre szabás:</strong> Az Ön preferenciái alapján testreszabott élmény nyújtása.</li>
                <li><strong>Biztonság és integritás:</strong> Rendszerünk biztonságának fenntartása és visszaélések megelőzése.</li>
            </ol>

            <h2 className='privacy2'>4. Az információk megosztása</h2>
            <p className='privacyp'>Személyes adatait nem adjuk ki harmadik feleknek. Minden adatot saját, Oracle Cloud VPS-en tárolunk, és kizárólag a MInerva belső működéséhez használjuk fel.</p>

            <h2 className='privacy2'>5. Adatmegőrzés és inaktiválás</h2>
            <p className='privacyp'>Személyes adatait mindaddig megőrizzük, amíg fiókja aktív. Lehetősége van fiókja inaktiválására, melynek során adatai elérhetetlenné válnak más felhasználók számára, kivéve a fórumon közzétett publikus üzeneteit, amelyek továbbra is láthatóak maradnak.</p>

            <h2 className='privacy2'>6. Adatbiztonság</h2>
            <p className='privacyp'>Az Ön adatainak védelme érdekében RSA titkosítást és hashelést alkalmazunk. Bár minden ésszerű lépést megteszünk adatai védelme érdekében, az interneten keresztüli adatátvitel soha nem lehet teljesen biztonságos.</p>

            <h2 className='privacy2' >7. Gyermekek adatainak védelme</h2>
            <p className='privacyp'>Szolgáltatásaink gyermekek számára is elérhetőek. Kiemelten fontos számunkra a fiatal felhasználók adatainak védelme, ezért különös figyelmet fordítunk adatkezelési gyakorlataink során a gyermekek személyes adatainak biztonságára.</p>

            <h2 className='privacy2'>8. Az Ön jogai</h2>
            <ul>
                <li><strong>Hozzáférhet</strong> személyes adataihoz.</li>
                <li><strong>Helyesbítheti</strong> pontatlan vagy hiányos adatait.</li>
                <li><strong>Kérheti adatai törlését vagy inaktiválását.</strong> Felhívjuk figyelmét, hogy a fórumon közzétett publikus üzenetek a fiók inaktiválása után is láthatóak maradnak.</li>
                <li><strong>Tiltakozhat</strong> adatai kezelése ellen.</li>
                <li><strong>Adathordozhatóságot kérhet,</strong> amennyiben ez technikailag megvalósítható.</li>
            </ul>

            <h2 className='privacy2'>9. Kapcsolatfelvétel</h2>
            <p className='privacyp'>Adatvédelmi gyakorlatainkkal kapcsolatos kérdéseivel forduljon hozzánk bizalommal az alábbi elérhetőségen:</p>
            <p className='privacyp'><strong>E-mail:</strong> <a href="mailto:support@edu-minerva.hu">support@edu-minerva.hu</a></p>

            <h2 className='privacy2'>10. A szabályzat módosításai</h2>
            <p className='privacyp'>Fenntartjuk a jogot jelen Adatvédelmi Szabályzat módosítására. A változásokról megfelelő időben értesítjük felhasználóinkat.</p>
            <p className='privacyp'><strong>Utolsó frissítés:</strong> 2025. március 27.</p>
        </Container>
    )
}