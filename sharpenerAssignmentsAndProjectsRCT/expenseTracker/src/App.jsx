import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import SignUp from "./components/SignUp";
const App = () => {
  return (
    <div>
      <Container fluid>
        <Row className="mt-5 justify-content-center ">
          <Col md={5}>
            <SignUp />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default App;
