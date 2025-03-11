import AI from "../components/AI.jsx";

import "../styles/main.css";

export default () => {
    return (
        <AI
            img={"./assets/images/ai_characters/bolyai.png"}
            altText={"Bolyai János kép"}
            title={"Bolyai János"}
            placeholderText={"Kérdezz bátran Bolyai Jánostól..."}
            personName={"bolyai_janos"}
        ></AI>
    );
}