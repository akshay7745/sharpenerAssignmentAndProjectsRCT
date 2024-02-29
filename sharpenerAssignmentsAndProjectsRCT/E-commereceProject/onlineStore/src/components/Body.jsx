// import React from "react";
import Products from "./Products";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import Button from "react-bootstrap/esm/Button";
const Body = () => {
  return (
    <>
      <Row>
        <Col>
          <h3 className="display-6  mt-4 fw-medium  text-center">MUSIC</h3>
        </Col>
      </Row>
      <Products />
      <Row className="justify-content-around mb-5 ">
        <Col md={2}>
          <Button className="ms-5 my-4 text-info " variant="secondary">
            See The Cart
          </Button>
        </Col>
      </Row>
    </>
  );
};

export default Body;
