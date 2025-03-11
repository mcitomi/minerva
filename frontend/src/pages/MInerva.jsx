import AI from "../components/AI.jsx";

import "../styles/main.css";

export default () => {
    return (
        <AI
            img={"./assets/images/ai_characters/minerva.png"}
            altText={"MInerva kép"}
            title={"MInerva"}
            placeholderText={"Kérdezz bátran MInervától..."}
            personName={"minerva"}
        ></AI>
    );
}