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
        path: "/store",
        element: <Body />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/",
        element: <Home />,
      },
    ],
    errorElement: <Error />,
  },
  {
    path: "/about",
    element: <About />,
  },
]);

export default router;
