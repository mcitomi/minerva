import AI from "../../components/AI.jsx";

import "../../styles/main.css";

export default () => {
    return (
        <AI
            img={"./assets/images/ai_characters/szemeredi.png"}
            altText={"Szemerédi Endre kép"}
            title={"Szemerédi Endre"}
            placeholderText={"Kérdezz bátran Szemerédi Endrétől..."}
            personName={"szemeredi_endre"}
        ></AI>
    );
}