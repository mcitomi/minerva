import AI from "../components/AI.jsx";

import "../styles/main.css";

export default () => {
    return (
        <AI
            img={"./assets/images/ai_characters/szechenyi.png"}
            altText={"Szechenyi István kép"}
            title={"Széchenyi István"}
            placeholderText={"Kérdezz bátran Széchenyi Istvántól..."}
            personName={"szechenyi_istvan"}
        ></AI>
    );
}