import Carousel from "react-bootstrap/Carousel";

export default () => {
  return (
    <Carousel>
        <Carousel.Item>
            <img src="./assets/images/carousel1.png" alt="Első kép"/>
        </Carousel.Item>
        <Carousel.Item>
            <img src="./assets/images/carousel2.png" alt="Második kép"/>
        </Carousel.Item>
        <Carousel.Item>
            <img src="./assets/images/carousel3.png" alt="Harmadik kép"/>
        </Carousel.Item>
        <Carousel.Item>
            <img src="./assets/images/carousel4.png" alt="Negyedik kép"/>
        </Carousel.Item>
    </Carousel>
  );
}