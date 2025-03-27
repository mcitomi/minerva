import { Container, Image } from "react-bootstrap";
import RightText from "../components/RightText.jsx";
import LeftText from "../components/LeftText.jsx";

import "../styles/main.css";

export default () => {
    return (
        <Container>
            <h2 className="mt-3">Készítők:</h2>
            <RightText
                img={"./assets/images/about/berdo.JPG"} 
                name={"Berdó Tamás"} 
                text1={"Berdó Tamás egy kiemelkedő programozó, aki weboldalunk backend fejlesztőjeként és mesterséges intelligencia (MI) kutatójaként dolgozott. Széleskörű tapasztalatával és szakmai tudásával jelentős mértékben hozzájárult a projekt sikeréhez."} 
                text2={"Tamás felelős volt a szerver tervezéséért és fejlesztéséért, amely a MInerva platform háttérszolgáltatásait biztosítja. Munkája során nemcsak a technikai megvalósításra, hanem a rendszer hatékonyságára is nagy hangsúlyt fektetett. Az általa létrehozott backend architektúra lehetővé tette, hogy a MInerva zökkenőmentesen működjön és képes legyen a felhasználói igények gyors kielégítésére."} 
                text3={"Tamás MI-kutatói tevékenysége során új megoldásokat és algoritmusokat dolgozott ki, amelyek tovább növelték a platform intelligenciáját és funkcionalitását. Innovatív megközelítései révén jelentős előrelépéseket ért el a mesterséges intelligencia alkalmazásában, amelyeket a MInerva is hasznosít."}
                text4={"Berdó Tamás munkája nemcsak technikai szempontból volt meghatározó, hanem hozzájárult a csapat szellemi fejlődéséhez is, hiszen tudását és tapasztalatait szívesen megosztotta csapattársaival. Az ő szakmai tudása nélkül a MInerva nem lenne az, ami ma."}></RightText>
            <LeftText 
                img={"./assets/images/about/fuleki.JPG"} 
                name={"Füleki József"} 
                text1={"Füleki József weboldalunk frontend fejlesztőjeként, UI és UX tervezőjeként, valamint grafikusaként dolgozott, amely kulcsszerepet játszott a platform sikerében. József feladatai közé tartozott a honlap rácsának megtervezése, a vizuális megjelenés kialakítása, valamint a felhasználói élmény javítása, hogy a honlap a látogatók számára a lehető legkellemesebb és intuitívabb interakciót biztosítsa."} 
                text2={"József kreatív látásmódja és technikai tudása lehetővé tette, hogy különböző grafikai elemeket alkalmazva egyedi és vonzó dizájnt hozzon létre. Az általa megtervezett felhasználói felület nemcsak esztétikus, hanem funkcionális is, hiszen a felhasználók könnyedén navigálhattak a weboldalon és gyorsan megtalálhatták a keresett információkat."} 
                text3={"A projekt címe és alcíme, valamint a megjelenés is az ő keze munkáját dicséri. React Bootstrap és különböző képszerkesztő programok használatával egy modern, reszponzív weboldalt alkotott, amely minden eszközön jól működik. József szakértelme és figyelme a részletekre hozzájárult ahhoz, hogy a MInerva platform vizuálisan vonzó és felhasználóbarát legyen."}
                text4={"Füleki József munkája nemcsak a dizájnra korlátozódott, hanem a felhasználói élmény folyamatos javítására is kiterjedt. Az ő elkötelezettsége nélkül a MInerva nem lenne az, ami ma."}></LeftText>
            <RightText 
                img={"./assets/images/about/sartner.JPG"} 
                name={"Sartner Bettina"} 
                text1={"Sartner Bettina weboldalunk adatmérnökeként kiemelkedő szerepet játszott a MInerva karaktereinek fejlesztésében és gazdagításában. Munkája során Bettina a karakterekhez szükséges adatokat gyűjtött és elemezett, biztosítva ezzel, hogy a platform a lehető legpontosabb és legérdekesebb információkat nyújtsa a felhasználók számára."}
                text2={"Bettina alapos kutatómunkát végzett, különböző forrásokból származó adatokat integrálva, hogy a MInerva karakterei hitelesek és vonzóak legyenek. Precíz és részletes megközelítése lehetővé tette, hogy a karakterek háttértörténetei, tulajdonságai és interakciói gazdagabbá váljanak. Emellett kisebb frontend feladatokat is ellátott, például a felhasználói felület egyes elemeinek optimalizálásában segédkezett."}
                text3={"Adatmérnöki tevékenysége során Bettina nemcsak az adatok gyűjtésére és rendszerezésére összpontosított, hanem a minőségellenőrzésre is, hogy a MInerva platformon megjelenő információk mindig megbízhatóak és relevánsak legyenek, emellett ő volt a fotográfus is."}
                text4={"Sartner Bettina munkája hozzájárult ahhoz, hogy a MInerva karakterei valóban életre keljenek, és a felhasználók számára egyedi élményt nyújtsanak. Az ő adatgyűjtése nélkül a MInerva nem lenne az, ami ma."}></RightText>
            <h2 className="mt-3">Konzulens:</h2>
            <LeftText 
                img={"./assets/images/about/molnar.JPG"} 
                name={"Molnár Máté Norbert"} 
                text1={"Molnár Máté Norbert záródolgozatunk konzulenseként kiemelkedő szerepet játszott a projekt sikerében. Szakmai tapasztalata és tudása révén irányította a csapatot, segítve a célok kitűzését és a feladatok végrehajtását."} 
                text2={"Máté nemcsak a technikai aspektusokban nyújtott támogatást, hanem a projekt megvalósítása során is aktívan részt vett. Tanácsaival és útmutatásaival hozzájárult ahhoz, hogy a csapat a legjobb megoldásokat találja meg és a vizsgaremek a lehető legmagasabb színvonalon készüljön el."} 
                text3={"Konzulensi szerepe mellett Máté folyamatosan motiválta a csapatot, bátorítva a kreatív gondolkodást és az innovatív megoldások keresését. Az ő szakmai támogatása és elkötelezettsége nélkül a projekt nem érhette volna el a kívánt eredményeket."}
                text4={"Molnár Máté Norbert munkája alapvető fontosságú volt a vizsgaremek sikeréhez és a csapat számára inspiráló példa a szakmai fejlődésre, valamint a közös célok elérésére. Az ő tanácsai nélkül a MInerva nem lenne az, ami ma."}></LeftText>
            <Image src="./assets/images/about/gang.jpg" alt="Közös kép" fluid></Image>
        </Container>
    );
}