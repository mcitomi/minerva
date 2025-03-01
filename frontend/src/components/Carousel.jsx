import { Carousel, Image } from "react-bootstrap";

import "../styles/carousel.css";

export default () => {
  return (
    <Carousel fluid style={{ maxHeight: "80vh", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Carousel.Item>
            <Image className="c-image" src="./assets/images/carousel/carousel1.png" alt="Első kép" fluid />
        </Carousel.Item>
        <Carousel.Item>
            <Image className="c-image" src="./assets/images/carousel/carousel2.png" alt="Második kép" fluid />
        </Carousel.Item>
        <Carousel.Item>
            <Image className="c-image" src="./assets/images/carousel/carousel3.png" alt="Harmadik kép" fluid />
        </Carousel.Item>
        <Carousel.Item>
            <Image className="c-image" src="./assets/images/carousel/carousel4.png" alt="Negyedik kép" fluid />
        </Carousel.Item>
        <Carousel.Item>
            <Image className="c-image" src="./assets/images/carousel/carousel5.png" alt="Ötödik kép" fluid />
        </Carousel.Item>
        <Carousel.Item>
            <Image className="c-image" src="./assets/images/carousel/carousel6.png" alt="Hatodik kép" fluid />
        </Carousel.Item>
        <Carousel.Item>
            <Image className="c-image" src="./assets/images/carousel/carousel7.png" alt="Hetedik kép" fluid />
        </Carousel.Item>
        <Carousel.Item>
            <Image className="c-image" src="./assets/images/carousel/carousel8.png" alt="Nyolcadik kép" fluid />
        </Carousel.Item>
    </Carousel>
  );
}