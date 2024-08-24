import MidicineList from "./components/MidicineList";
import AddMedicine from "./components/AddMedicine";
import Cart from "./components/Cart";
import { Fragment, useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
const App = () => {
  const [show, setShow] = useState(false);
  const handleShow = () => {
    setShow(true);
  };
  const handleHide = () => {
    setShow(false);
  };
  return (
    <Fragment>
      {show && <Cart handleHide={handleHide} />}
      <Container fluid>
        <main>
          <section>
            <Row className="justify-content-center">
              <Col md={6}>
                <AddMedicine />
              </Col>
            </Row>
            <Button
              variant="warning"
              style={{
                position: "fixed",
                top: 30,
                left: 1400,
              }}
              onClick={handleShow}
            >
              Cart
            </Button>
          </section>
          <section>
            <Row className="justify-content-center">
              <Col md={7}>
                <MidicineList />
              </Col>
            </Row>
          </section>
        </main>
      </Container>
    </Fragment>
  );
};

export default App;
