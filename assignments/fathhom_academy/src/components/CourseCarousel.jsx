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
        <Carousel.Caption className="text-white bg-primary bg-opacity-50 ">
          <h3 className="display-1">Who are we ?</h3>
          <p className="display-5">
            We are Fathhom Academy. Trend setter in the online education
            industry
          </p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          style={{ height: "500px" }}
          className="d-block w-100"
          src="carousel2.jpg"
          alt="Second slide"
        />
        <Carousel.Caption className="text-dark bg-warning bg-opacity-50">
          <h3 className="display-1">Valuable content</h3>
          <p className="display-5">
            We strive to provide unparallel high quality education to our users.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          style={{ height: "500px" }}
          className="d-block w-100"
          src="carousel3.jpg"
          alt="Third slide"
        />
        <Carousel.Caption className="text-dark bg-primary bg-opacity-50 ">
          <h3 className="display-1">Explore courses</h3>
          <p className="display-5">
            We have provided wide range of courses. Please checkout the courses.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default CourseCarousel;
