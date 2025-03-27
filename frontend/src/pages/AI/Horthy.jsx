import AI from "../../components/AI.jsx";

import "../../styles/main.css";

export default ({handleLogout, isLogged}) => {
    return (
        <AI
            img={"./assets/images/ai_characters/horthy.png"}
            altText={"Horthy Miklós kép"}
            title={"Horthy Miklós"}
            placeholderText={"Kérdezz bátran Horthy Miklóstól..."}
            personName={"horthy_miklos"}
            handleLogout={handleLogout} 
            isLogged={isLogged}
        ></AI>
    );
}