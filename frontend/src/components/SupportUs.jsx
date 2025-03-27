import { Container, Button } from "react-bootstrap";

export default () => {
    return (
        <Container className="mt-5">
            <Content 
                title={"Támogass minket!"} 
                text1={"A támogatásokból befolyt összegeket az oldal fejlesztésére és fenntartására fordítjuk, melyről transzparens módon elszámolunk."} 
                text2={"Köszönjük!"}></Content>
            <div className="text-center" style={{marginBottom: 30}}>
                <a href="https://buymeacoffee.com/eduminerva" target="_blank">
                    <Button variant="warning" style={{fontFamily: 'Pacifico', fontSize: "20px"}}>Támogatás</Button>
                </a>
            </div>
        </Container>
    );
}

function Content({ title, text1, text2 }) {
    return(
        <>
            <h2 style={{marginBottom: 30}}>{title}</h2>
            <p>{text1}</p>
            <p>{text2}</p>
        </>
    );
}