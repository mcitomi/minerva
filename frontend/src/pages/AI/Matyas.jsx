import AI from "../../components/AI.jsx";

import "../../styles/main.css";

export default () => {
    return (
        <AI
            img={"./assets/images/ai_characters/matyas.png"}
            altText={"Mátyás király kép"}
            title={"Mátyás király"}
            placeholderText={"Kérdezz bátran Mátyás királytól..."}
            personName={"matyas_kiraly"}
        ></AI>
    );
}