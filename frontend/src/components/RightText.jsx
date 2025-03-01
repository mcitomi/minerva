import { Row, Col, Image } from "react-bootstrap";

export default ({ img, name, text1, text2, text3 }) => {
    return (
        <Row>
            <Col sx={12} md={6}>
                <Image src={img} alt={name} fluid ></Image>
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