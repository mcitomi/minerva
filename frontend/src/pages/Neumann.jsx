import AI from "../components/AI.jsx";

import "../styles/main.css";

export default () => {
    return (
        <AI
            img={"./assets/images/ai_characters/neumann.png"}
            altText={"Neumann János kép"}
            title={"Neumann János"}
            placeholderText={"Kérdezz bátran Neumann Jánostól..."}
        ></AI>
    );
}