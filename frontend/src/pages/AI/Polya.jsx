import AI from "../../components/AI.jsx";

import "../../styles/main.css";

export default () => {
    return (
        <AI
            img={"./assets/images/ai_characters/polya.png"}
            altText={"Pólya György kép"}
            title={"Pólya györgy"}
            placeholderText={"Kérdezz bátran Pólya Györgytől..."}
            personName={"polya_gyorgy"}
        ></AI>
    );
}