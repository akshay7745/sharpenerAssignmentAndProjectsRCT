import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import NavbarText from "react-bootstrap/esm/NavbarText";
import { useContext, useEffect } from "react";
import { NavLink } from "react-router-dom";
import cartContext from "../contexts/cartContext";
import authContext from "../contexts/authContext";
const Header = ({ onShow }) => {
  const { cartData, clearCart } = useContext(cartContext);
  const { isAuthenticated, handleLogout } = useContext(authContext);
  // const saveCartData = async (data) => {
  //   try {
  //     const res = await fetch("url", {
  //       method: "POST",
  //       body: JSON.stringify(data),
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  // useEffect(() => {}, [cartData]);
  const totalItems = cartData.reduce((acc, item) => {
    return acc + item.quantity;
  }, 0);
  return (
    <Navbar bg="dark" expand data-bs-theme="dark" fixed="top">
      <Container>
        <Navbar.Brand>SuperMart</Navbar.Brand>
        <Nav>
          <Nav.Item>
            <NavLink
              className={" mx-3 text-decoration-none "}
              style={({ isActive }) => {
                return {
                  color: isActive ? "#4169E1" : "white",
                };
              }}
              to="/"
            >
              Home
            </NavLink>
          </Nav.Item>
          <Nav.Item>
            <NavLink
              className={" mx-3 text-decoration-none"}
              style={({ isActive }) => {
                return {
                  color: isActive ? "#4169E1" : "white",
                };
              }}
              to="/product"
            >
              Store
            </NavLink>
          </Nav.Item>
          <Nav.Item>
            <NavLink
              className={" mx-3 text-decoration-none"}
              style={({ isActive }) => {
                return {
                  color: isActive ? "#4169E1" : "white",
                };
              }}
              to="/about"
            >
              About
            </NavLink>
          </Nav.Item>
          <Nav.Item>
            <NavLink
              className={" mx-3 text-decoration-none"}
              style={({ isActive }) => {
                return {
                  color: isActive ? "#4169E1" : "white",
                };
              }}
              to="/contactus"
            >
              Contact Us
            </NavLink>
          </Nav.Item>
          {!isAuthenticated && (
            <Nav.Item>
              <NavLink to="/login">Login</NavLink>
            </Nav.Item>
          )}
          {isAuthenticated && (
            <Nav.Item>
              <button
                onClick={() => {
                  handleLogout();
                  clearCart();
                }}
              >
                Logout
              </button>
            </Nav.Item>
          )}
        </Nav>
        {isAuthenticated && (
          <Nav onClick={onShow}>
            <NavbarText className="border-primary border-2   border p-1 rounded-2  ">
              Cart
              <span className="badge bg-secondary p-2 ms-1 ">{totalItems}</span>
            </NavbarText>
          </Nav>
        )}
      </Container>
    </Navbar>
  );
};

export default Header;
