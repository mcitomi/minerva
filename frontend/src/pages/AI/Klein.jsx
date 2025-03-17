import AI from "../../components/AI.jsx";

import "../../styles/main.css";

export default () => {
    return (
        <AI
            img={"./assets/images/ai_characters/klein.png"}
            altText={"Klein Gyula kép"}
            title={"Klein Gyula"}
            placeholderText={"Kérdezz bátran Klein Gyulától..."}
            personName={"klein_gyula"}
        ></AI>
    );
}