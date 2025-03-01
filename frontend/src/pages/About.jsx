import { Container, Image } from "react-bootstrap";
import RightText from "../components/RightText";
import LeftText from "../components/LeftText";

import "../styles/main.css";

export default () => {
    return (
        <Container>
            <h2 className="mt-3">Készítők:</h2>
            <RightText 
                img={"./assets/images/"} 
                name={"Berdó Tamás"} 
                text1={"Tomi kiváló backend programozó, akinek a weboldal készítés a kisujjában van. Modern technikákkal dolgozik, mindig naprakész."} 
                text2={"Imádja a macskákat és a programozást. Ő egy igazi „Code Cat”. :3"} 
                text3={"Cicafiú 19 éves, programozó."}></RightText>
            <LeftText 
                img={"./assets/images/"} 
                name={"Füleki József"} 
                text1={"Józsi jó frontend programozó és kiváló rajzoló. Modern technikákkal dolgozik, mindig naprakész."} 
                text2={"Imádja az animációkat. Távol áll tőle az informatika bonyolult világa, de a szíve lelkét beleadja."} 
                text3={"Jósk 18 éves, rajzoló."}></LeftText>
            <RightText 
                img={"./assets/images/"} 
                name={"Sartner Bettina"} 
                text1={"Betti kiváló fotós, akinek a fényképezés a kisujjában van. Modern technikákkal dolgozik, mindig naprakész."} 
                text2={"Imádja a kutyákat és a fényképezést. A programozás bár nem erőssége, de a szíve lelkét beleadja."} 
                text3={"18 éves, fényképész."}></RightText>
            <h2 className="mt-3">Konzulens:</h2>
            <LeftText 
                img={"./assets/images/"} 
                name={"Molnár Máté Norbert"} 
                text1={"Komédiás 1 kiváló programozó és vicces tanár. Modern technikákkal dolgozik, mindig naprakész."} 
                text2={"Imádja a programozást és a focit. Fontos számára, hogy diákjaival meg tudja szerettetni az informatikát és minél többen a szakmájukban dolgozzanak."} 
                text3={"Máré 21 éves, tanár."}></LeftText>
            <Image src="./assets/images/about/" alt="Közös kép"></Image>
        </Container>
    );
}