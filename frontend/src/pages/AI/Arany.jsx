import AI from "../../components/AI.jsx";

import "../../styles/main.css";

export default ({handleLogout, isLogged}) => {
    return (
        <AI
            img={"./assets/images/ai_characters/arany.png"}
            altText={"Arany János kép"}
            title={"Arany János"}
            placeholderText={"Kérdezz bátran Arany Jánostól..."}
            personName={"arany_janos"}
            handleLogout={handleLogout} 
            isLogged={isLogged}
        ></AI>
    );
}