import { useState } from "react";
import { Alert } from "react-bootstrap";

export default ({title, text}) => {
    const [show, setShow] = useState(true);
    if (show) {
        return(
            <Alert variant="danger" onClose={() => setShow(false)} dismissible className="mt-3">
                <Alert.Heading>{title}</Alert.Heading>
                <p>{text}</p>
            </Alert>
        );
    }
}