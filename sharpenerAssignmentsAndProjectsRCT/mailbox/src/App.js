import "./App.css";
import Stack from "react-bootstrap/Stack";
import Button from "react-bootstrap/Button";
import Header from "./components/Header";
import Signup from "./components/Signup";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
function App() {
  return (
    <>
      <Header />
      <Container fluid>
        <Row className="justify-content-center mt-5 ">
          <Col className="" md={4}>
            <Signup />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default App;
