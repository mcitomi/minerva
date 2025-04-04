import AI from "../../components/AI.jsx";

import "../../styles/main.css";

export default ({handleLogout, isLogged}) => {
    return (
        <AI
            img={"./assets/images/ai_characters/babits.png"}
            altText={"Babits Mihály kép"}
            title={"Babits Mihály"}
            placeholderText={"Kérdezz bátran Babits Mihálytól..."}
            personName={"babits_mihaly"}
            handleLogout={handleLogout} 
            isLogged={isLogged}
        ></AI>
    );
}