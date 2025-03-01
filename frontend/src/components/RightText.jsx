import { Row, Col, Image } from "react-bootstrap";

export default ({ img, name, text1, text2, text3 }) => {
    return (
        <Row className="mt-5 mb-5">
            <Col sx={12} md={6} className="d-flex justify-content-center">
                <div style={{ borderRadius: "50%", overflow: "hidden", width: "500px", height: "500px" }}>
                    <Image src={img} alt={name} fluid style={{ height: "100%", width: "100%", objectFit: "cover" }} />
                </div>
            </Col>
            <Col sx={12} md={6}>
                <h3>{name}</h3>
                <p>{text1}</p>
                <p>{text2}</p>
                <p>{text3}</p>
            </Col>
        </Row>
    );
}