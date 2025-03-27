import AI from "../../components/AI.jsx";

import "../../styles/main.css";

export default ({handleLogout, isLogged}) => {
    return (
        <AI
            img={"./assets/images/ai_characters/klein.png"}
            altText={"Klein Gyula kép"}
            title={"Klein Gyula"}
            placeholderText={"Kérdezz bátran Klein Gyulától..."}
            personName={"klein_gyula"}
            handleLogout={handleLogout} 
            isLogged={isLogged}
        ></AI>
    );
}