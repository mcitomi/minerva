import AI from "../../components/AI.jsx";

import "../../styles/main.css";

export default ({handleLogout, isLogged}) => {
    return (
        <AI
            img={"./assets/images/ai_characters/turan.png"}
            altText={"Túrán Pál kép"}
            title={"Túrán Pál"}
            placeholderText={"Kérdezz bátran Túrán Páltól..."}
            personName={"turan_pal"}
            handleLogout={handleLogout} 
            isLogged={isLogged}
        ></AI>
    );
}