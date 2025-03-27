import AI from "../../components/AI.jsx";

import "../../styles/main.css";

export default ({handleLogout, isLogged}) => {
    return (
        <AI
            img={"./assets/images/ai_characters/bolyaifarkas.png"}
            altText={"Bolyai Farkas kép"}
            title={"Bolyai Farkas"}
            placeholderText={"Kérdezz bátran Bolyai Farkastól..."}
            personName={"bolyai_farkas"}
            handleLogout={handleLogout} 
            isLogged={isLogged}
        ></AI>
    );
}