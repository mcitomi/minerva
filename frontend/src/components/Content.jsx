import { Image } from "react-bootstrap";

export default ({title, paragraph, img}) => {
    return (
        <>
            <div className="d-flex justify-content-center">
                <Image src={img} alt="Dekor kép" fluid style={{maxWidth:"400px"}}></Image>
            </div>
            <h1 style={{marginTop: 30}}>{title}</h1>
            <p>{paragraph}</p>
        </>
    );
}