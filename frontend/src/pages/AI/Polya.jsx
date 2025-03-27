import AI from "../../components/AI.jsx";

import "../../styles/main.css";

export default ({handleLogout, isLogged}) => {
    return (
        <AI
            img={"./assets/images/ai_characters/polya.png"}
            altText={"Pólya György kép"}
            title={"Pólya györgy"}
            placeholderText={"Kérdezz bátran Pólya Györgytől..."}
            personName={"polya_gyorgy"}
            handleLogout={handleLogout} 
            isLogged={isLogged}
        ></AI>
    );
}