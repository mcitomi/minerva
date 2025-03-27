import AI from "../../components/AI.jsx";

import "../../styles/main.css";

export default ({handleLogout, isLogged}) => {
    return (
        <AI
            img={"./assets/images/ai_characters/kosztolanyi.png"}
            altText={"Kosztolányi Dezső kép"}
            title={"Kosztolányi Dezső"}
            placeholderText={"Kérdezz bátran Kosztolányi Dezsőtől..."}
            personName={"kosztolanyi_dezso"}
            handleLogout={handleLogout} 
            isLogged={isLogged}
        ></AI>
    );
}