import AI from "../../components/AI.jsx";

import "../../styles/main.css";

export default () => {
    return (
        <AI
            img={"./assets/images/ai_characters/lovasz.png"}
            altText={"Lovász László kép"}
            title={"Lovász László"}
            placeholderText={"Kérdezz bátran Lovász Lászlótól..."}
            personName={"lovasz_laszlo"}
        ></AI>
    );
}