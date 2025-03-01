import { Button, Collapse } from "react-bootstrap";
import { useState } from "react";

export default () => {
    const [open, setOpen] = useState(false);

    return (
        <>
            <Button onClick={() => setOpen(!open)} aria-controls="information" aria-expanded={open} variant="warning" style={{fontFamily: 'Pacifico', fontSize: "20px"}}>Kattints ide!</Button>
            <Collapse in={open}>
                <div id="information" className="mt-2">
                    <p>Bizonyára nem tudtad, de Pallasz Athénének különböző jelképei vannak. Általában karddal, lándzsával, sisakkal és gorgósfős mellvérttel ábrázolják. Mellvértjét másképpen pajzsát Zeusz készítette Héphaisztosszal.</p>
                    <p>Athéné szent állata a bagoly volt, amit a bölcsességgel és tudással párosítunk. Oltama alatt álltak a városok, amely közül az első Athén volt.</p>             
                </div>
            </Collapse>
        </>
    );
}