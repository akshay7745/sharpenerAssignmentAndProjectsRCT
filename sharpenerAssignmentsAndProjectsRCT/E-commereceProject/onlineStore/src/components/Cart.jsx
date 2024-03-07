import Offcanvas from "react-bootstrap/Offcanvas";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { useContext, useEffect } from "react";
import cartContext from "../contexts/cartContext";
import Button from "react-bootstrap/Button";
import authContext from "../contexts/authContext";
const Cart = ({ show, handleClose }) => {
  const { cartData, onAddToCart } = useContext(cartContext);
  // const { isAuthenticated, userName } = useContext(authContext);
  const totalAmount = cartData.reduce((acc, item) => {
    return acc + item.quantity * item.price;
  }, 0);
  // const getCartData = async (name) => {
  //   try {
  //     const res = await fetch(
  //       `https://crudcrud.com/api/a1d6682b14c44c0c918d9ea2d0c1c75a/cart${name}`
  //     );
  //     if (res.ok) {
  //       console.log(res, "From cart component");
  //       const resData = await res.json();
  //       console.log(
  //         resData[resData.length - 1].cartData,
  //         "Cart component and this data will be loaded in the cart"
  //       );
  //       // console.log(resData, "cart component and applying json");
  //       onAddToCart(resData[resData.length - 1].cartData);
  //     } else {
  //       throw new Error("Add products to the cart");
  //     }
  //   } catch (error) {
  //     console.log(error.message);
  //     alert(error);
  //   }
  // };
  // useEffect(() => {
  //   if (isAuthenticated && show) {
  //     getCartData(userName);
  //   }
  // }, [isAuthenticated, userName, show]);
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
                {cartData.length === 0 ? (
                  <h1>Add products to cart</h1>
                ) : (
                  <table className="table-borderless text-center">
                    <thead>
                      <tr>
                        <th>Item</th>
                        <th>Price</th>
                        <th>Quantity</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cartData.length === 0 ? (
                        <h3>Cart is empty</h3>
                      ) : (
                        cartData?.map((item) => {
                          return (
                            <tr
                              key={item.id + item.title}
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
                              <td>₹{item.price}</td>
                              <td className="d-flex">
                                <span className="border border-1 border-primary mx-4 px-3 py-0 ">
                                  {item.quantity}
                                </span>
                                <Button variant="danger">Remove</Button>
                              </td>
                            </tr>
                          );
                        })
                      )}
                    </tbody>
                  </table>
                )}
              </Col>
            </Row>
            <Row>
              <Col className="text-end ">
                <h4>
                  Total <span> ₹ {totalAmount}</span>
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
