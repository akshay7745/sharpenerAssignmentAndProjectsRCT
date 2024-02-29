import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

const Footer = () => {
  return (
    <Row
      className="bg-info justify-content-evenly align-items-center px-4 fixed-bottom  "
      style={{ height: "100px" }}
    >
      <Col md={4} className="text-center my-4 ">
        <span className="display-5 fw-semibold text-white">The Generics</span>
      </Col>

      <Col md={4}>
        <i
          className="bi bi-youtube text-danger mx-5 "
          style={{ fontSize: "30px" }}
        ></i>
        <i
          className="bi bi-spotify text-success mx-5 "
          style={{ fontSize: "30px" }}
        ></i>
        <i
          className="bi bi-facebook text-primary mx-5"
          style={{ fontSize: "30px" }}
        ></i>
      </Col>
    </Row>
  );
};

export default Footer;
