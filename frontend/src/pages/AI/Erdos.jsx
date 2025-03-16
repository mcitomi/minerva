import AI from "../../components/AI.jsx";

import "../../styles/main.css";

export default () => {
    return (
        <AI
            img={"./assets/images/ai_characters/erdos.png"}
            altText={"Erdős Pál kép"}
            title={"Erdős Pál"}
            placeholderText={"Kérdezz bátran Erdős Páltól..."}
            personName={"erdos_pal"}
        ></AI>
    );
}