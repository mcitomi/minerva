import AI from "../../components/AI.jsx";

import "../../styles/main.css";

export default ({handleLogout, isLogged}) => {
    return (
        <AI
            img={"./assets/images/ai_characters/zrinyi.png"}
            altText={"Zrinyi Miklós kép"}
            title={"Zrinyi Miklós"}
            placeholderText={"Kérdezz bátran Zrinyi Miklóstól..."}
            personName={"zrinyi_miklos"}
            handleLogout={handleLogout} 
            isLogged={isLogged}
        ></AI>
    );
}