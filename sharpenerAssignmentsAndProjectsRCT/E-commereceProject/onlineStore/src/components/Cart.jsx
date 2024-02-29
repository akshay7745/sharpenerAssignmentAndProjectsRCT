import Offcanvas from "react-bootstrap/Offcanvas";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { useContext } from "react";
import cartContext from "../contexts/cartContext";
import Button from "react-bootstrap/Button";
const Cart = ({ show, handleClose }) => {
  const { cartData } = useContext(cartContext);
  const totalAmount = cartData.reduce((acc, item) => {
    return acc + item.quantity * item.price;
  }, 0);
  return (
    <>
      <Offcanvas show={show} placement={"end"} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
            <h3 className="text-center " style={{ marginLeft: "150px" }}>
              CART
            </h3>
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Container fluid>
            <Row className="justify-content-center mt-2 ">
              <Col>
                <table className="table-borderless text-center">
                  <thead>
                    <tr>
                      <th>Item</th>
                      <th>Price</th>
                      <th>Quantity</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartData.map((item) => {
                      return (
                        <tr
                          key={item.title + item.quantity}
                          className="align-items-center "
                        >
                          <td>
                            <img
                              src={item.imageUrl}
                              alt={item.title}
                              className="img-fluid "
                              style={{ width: "60px" }}
                            />
                            <p>{item.title}</p>
                          </td>
                          <td>${item.price}</td>
                          <td className="d-flex">
                            <span className="border border-1 border-primary mx-4 px-3 py-0 ">
                              {item.quantity}
                            </span>
                            <Button variant="danger">Remove</Button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </Col>
            </Row>
            <Row>
              <Col className="text-end ">
                <h4>
                  Total <span>${totalAmount}</span>
                </h4>
              </Col>
            </Row>
            <Row>
              <Col className="text-center mt-5">
                <Button className="primary fw-semibold fs-5">PURCHASE</Button>
              </Col>
            </Row>
          </Container>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default Cart;
