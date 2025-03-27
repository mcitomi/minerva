import AI from "../../components/AI.jsx";

import "../../styles/main.css";

export default ({handleLogout, isLogged}) => {
    return (
        <AI
            img={"./assets/images/ai_characters/eotvos.png"}
            altText={"Eötvös Lóránd kép"}
            title={"Eötvös Lóránd"}
            placeholderText={"Kérdezz bátran Eötvös Lórándtól..."}
            personName={"eotvos_lorand"}
            handleLogout={handleLogout} 
            isLogged={isLogged}
        ></AI>
    );
}