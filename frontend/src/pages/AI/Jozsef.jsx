import AI from "../../components/AI.jsx";

import "../../styles/main.css";

export default ({handleLogout, isLogged}) => {
    return (
        <AI
            img={"./assets/images/ai_characters/jozsef.png"}
            altText={"József Attila kép"}
            title={"József Attila"}
            placeholderText={"Kérdezz bátran József Attilától..."}
            personName={"jozsef_attila"}
            handleLogout={handleLogout} 
            isLogged={isLogged}
        ></AI>
    );
}