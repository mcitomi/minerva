import { Row, Col, Image } from "react-bootstrap";

import "../styles/splash-texts.css";

export default ({ img, name, text1, text2, text3, text4 }) => {
    return (
        <Row className="mt-5 mb-5">
            <Col sx={12} md={6} className="splash">
                <h3 className="mb-3">{name}</h3>
                <p style={{textAlign: "justify", textIndent: "20px", paddingLeft: "20px", paddingRight:"20px"}}>{text1}</p>
                <p style={{textAlign: "justify", textIndent: "20px", paddingLeft: "20px", paddingRight:"20px"}}>{text2}</p>
                <p style={{textAlign: "justify", textIndent: "20px", paddingLeft: "20px", paddingRight:"20px"}}>{text3}</p>
                <p style={{textAlign: "justify", textIndent: "20px",paddingLeft: "20px", paddingRight:"20px"}}>{text4}</p>
            </Col>
            <Col sx={12} md={6} className="d-flex justify-content-center">
                <div style={{ borderRadius: "50%", overflow: "hidden", width: "500px", height: "500px", border: "#699fcb 5px solid" }} className="mt-2 mb-2">
                    <Image src={img} alt={name} fluid style={{ height: "100%", width: "100%", objectFit: "cover" }} />
                </div>
            </Col>
        </Row>
    );
}