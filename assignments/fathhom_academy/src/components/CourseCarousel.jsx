import Carousel from "react-bootstrap/Carousel";

function CourseCarousel() {
  return (
    <Carousel
      data-bs-theme="dark"
      className="border border-2 rounded-2 border-dark"
    >
      <Carousel.Item>
        <img
          style={{ height: "500px" }}
          className="d-block w-100"
          src="carousel1.jpg"
          alt="First slide"
        />
        <Carousel.Caption className="text-white bg-primary bg-opacity-50 display-1">
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          style={{ height: "500px" }}
          className="d-block w-100"
          src="carousel2.jpg"
          alt="Second slide"
        />
        <Carousel.Caption className="text-dark bg-warning bg-opacity-50 display-1">
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          style={{ height: "500px" }}
          className="d-block w-100"
          src="carousel3.jpg"
          alt="Third slide"
        />
        <Carousel.Caption className="text-dark bg-primary bg-opacity-50 display-1">
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default CourseCarousel;
