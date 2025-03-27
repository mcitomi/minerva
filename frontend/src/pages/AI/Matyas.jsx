import AI from "../../components/AI.jsx";

import "../../styles/main.css";

export default ({handleLogout, isLogged}) => {
    return (
        <AI
            img={"./assets/images/ai_characters/matyas.png"}
            altText={"Mátyás király kép"}
            title={"Mátyás király"}
            placeholderText={"Kérdezz bátran Mátyás királytól..."}
            personName={"matyas_kiraly"}
            handleLogout={handleLogout} 
            isLogged={isLogged}
        ></AI>
    );
}