import AI from "../../components/AI.jsx";

import "../../styles/main.css";

export default ({handleLogout, isLogged}) => {
    return (
        <AI
            img={"./assets/images/ai_characters/hunyadi.png"}
            altText={"Hunyadi János kép"}
            title={"Hunyadi János"}
            placeholderText={"Kérdezz bátran Hunyadi Jánostól..."}
            personName={"hunyadi_janos"}
            handleLogout={handleLogout} 
            isLogged={isLogged}
        ></AI>
    );
}