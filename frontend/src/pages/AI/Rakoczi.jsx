import AI from "../../components/AI.jsx";

import "../../styles/main.css";

export default ({handleLogout, isLogged}) => {
    return (
        <AI
            img={"./assets/images/ai_characters/rakoczi.png"}
            altText={"II. Rákóczi Ferenc kép"}
            title={"II. Rákóczi Ferenc"}
            placeholderText={"Kérdezz bátran II. Rákóczi Ferenctől..."}
            personName={"rakoczi_ferenc"}
            handleLogout={handleLogout} 
            isLogged={isLogged}
        ></AI>
    );
}