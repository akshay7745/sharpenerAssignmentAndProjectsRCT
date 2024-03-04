import Header from "./components/Header";
import Container from "react-bootstrap/Container";
import Footer from "./components/Footer";
import { useState } from "react";
import { createBrowserRouter, Outlet } from "react-router-dom";
import About from "./components/About";
import Body from "./components/Body";
import Error from "./components/Error";
import Home from "./components/Home";
import Cart from "./components/Cart";
import ContactUs from "./components/ContactUs";
import SingleProduct from "./components/SingleProduct";
function App() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Cart show={show} handleClose={handleClose} />
      <Header onShow={handleShow} onHide={handleClose} />
      <Container fluid>
        <Outlet />
        <Footer />
      </Container>
    </>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/product",
        element: <Body />,
      },
      {
        path: "/product/:productId",
        element: <SingleProduct />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/contactus",
        element: <ContactUs />,
      },
    ],
    errorElement: <Error />,
  },
]);

export default router;
