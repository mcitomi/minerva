import AI from "../../components/AI.jsx";

import "../../styles/main.css";

export default ({handleLogout, isLogged}) => {
    return (
        <AI
            img={"./assets/images/ai_characters/kossuth.png"}
            altText={"Kossuth Lajos kép"}
            title={"Kossuth Lajos"}
            placeholderText={"Kérdezz bátran Kossuth Lajostól..."}
            personName={"kossuth_lajos"}
            handleLogout={handleLogout} 
            isLogged={isLogged}
        ></AI>
    );
}