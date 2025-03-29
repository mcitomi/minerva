import AI from "../../components/AI.jsx";

import "../../styles/main.css";

export default ({handleLogout, isLogged}) => {
    return (
        <AI
            img={"./assets/images/ai_characters/konig.png"}
            altText={"Kőnig Gyula kép"}
            title={"Kőnig Gyula"}
            placeholderText={"Kérdezz bátran Kőnig Gyulától..."}
            personName={"konig_gyula"}
            handleLogout={handleLogout} 
            isLogged={isLogged}
        ></AI>
    );
}