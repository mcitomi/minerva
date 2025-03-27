import AI from "../../components/AI.jsx";

import "../../styles/main.css";

export default ({handleLogout, isLogged}) => {
    return (
        <AI
            img={"./assets/images/ai_characters/saint.png"}
            altText={"Szent István kép"}
            title={"Szent István"}
            placeholderText={"Kérdezz bátran Szent Istvántól..."}
            personName={"szent_istvan"}
            handleLogout={handleLogout} 
            isLogged={isLogged}
        ></AI>
    );
}