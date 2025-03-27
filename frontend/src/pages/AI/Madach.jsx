import AI from "../../components/AI.jsx";

import "../../styles/main.css";

export default ({handleLogout, isLogged}) => {
    return (
        <AI
            img={"./assets/images/ai_characters/madach.png"}
            altText={"Madách Imre kép"}
            title={"Madách Imre"}
            placeholderText={"Kérdezz bátran Madách Imrétől..."}
            personName={"madach_imre"}
            handleLogout={handleLogout} 
            isLogged={isLogged}
        ></AI>
    );
}