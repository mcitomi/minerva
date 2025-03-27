import AI from "../../components/AI.jsx";

import "../../styles/main.css";

export default ({handleLogout, isLogged}) => {
    return (
        <AI
            img={"./assets/images/ai_characters/rakoczi.png"}
            altText={"Rákóczi Ferenc kép"}
            title={"Rákóczi Ferenc"}
            placeholderText={"Kérdezz bátran Rákóczi Ferenctől..."}
            personName={"rakoczi_ferenc"}
            handleLogout={handleLogout} 
            isLogged={isLogged}
        ></AI>
    );
}