import AI from "../../components/AI.jsx";

import "../../styles/main.css";

export default ({handleLogout, isLogged}) => {
    return (
        <AI
            img={"./assets/images/ai_characters/ady.png"}
            altText={"Ady Endre kép"}
            title={"Ady Endre"}
            placeholderText={"Kérdezz bátran Ady Endrétől..."}
            personName={"ady_endre"}
            handleLogout={handleLogout} 
            isLogged={isLogged}
        ></AI>
    );
}