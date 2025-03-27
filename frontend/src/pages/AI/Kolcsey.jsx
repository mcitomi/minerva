import AI from "../../components/AI.jsx";

import "../../styles/main.css";

export default ({handleLogout, isLogged}) => {
    return (
        <AI
            img={"./assets/images/ai_characters/kolcsey.png"}
            altText={"Kölcsey Ferenc kép"}
            title={"Kölcsey Ferenc"}
            placeholderText={"Kérdezz bátran Kölcsey Ferenctől..."}
            personName={"kolcsey_ferenc"}
            handleLogout={handleLogout} 
            isLogged={isLogged}
        ></AI>
    );
}