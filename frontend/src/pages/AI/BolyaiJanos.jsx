import AI from "../../components/AI.jsx";

import "../../styles/main.css";

export default ({handleLogout, isLogged}) => {
    return (
        <AI
            img={"./assets/images/ai_characters/bolyaijanos.png"}
            altText={"Bolyai János kép"}
            title={"Bolyai János"}
            placeholderText={"Kérdezz bátran Bolyai Jánostól..."}
            personName={"bolyai_janos"}
            handleLogout={handleLogout} 
            isLogged={isLogged}
        ></AI>
    );
}