import Carousel from "react-bootstrap/Carousel";
import Image from 'react-bootstrap/Image';

import "../styles/carousel.css";

export default () => {
  return (
    <Carousel fluid style={{ maxHeight: "80vh", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Carousel.Item>
            <Image className="c-image" src="./assets/images/carousel1.png" alt="Első kép" fluid />
        </Carousel.Item>
        <Carousel.Item>
            <Image className="c-image" src="./assets/images/carousel2.png" alt="Második kép" fluid />
        </Carousel.Item>
        <Carousel.Item>
            <Image className="c-image" src="./assets/images/carousel3.png" alt="Harmadik kép" fluid />
        </Carousel.Item>
        <Carousel.Item>
            <Image className="c-image" src="./assets/images/carousel4.png" alt="Negyedik kép" fluid />
        </Carousel.Item>
    </Carousel>
  );
}