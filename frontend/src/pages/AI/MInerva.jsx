import AI from "../../components/AI.jsx";

import "../../styles/main.css";

export default ({handleLogout, isLogged}) => {
    return (
        <AI
            img={"./assets/images/ai_characters/minerva.png"}
            altText={"MInerva kép"}
            title={"MInerva"}
            placeholderText={"Kérdezz bátran MInervától..."}
            personName={"minerva"}
            handleLogout={handleLogout} 
            isLogged={isLogged}
        ></AI>
    );
}