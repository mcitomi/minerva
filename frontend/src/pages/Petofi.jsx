import AI from "../components/AI.jsx";

import "../styles/main.css";

export default () => {
    return (
        <AI
            img={"./assets/images/ai_characters/petofi.png"}
            altText={"Petőfi Sándor kép"}
            title={"Petőfi Sándor"}
            placeholderText={"Kérdezz bátran Petőfi Sándortól..."}
            personName={"petofi_sandor"}
        ></AI>
    );
}