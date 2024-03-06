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
import Login from "./components/Login";
import ProtectedRoute from "./components/ProtectedRoute";
// import { Navigate } from "react-router-dom";
// import authContext from "./contexts/authContext";
function App() {
  const [show, setShow] = useState(false);
  // const { isAuthenticated } = useContext(authContext);
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

        element: (
          <ProtectedRoute>
            {" "}
            <Body />
          </ProtectedRoute>
        ),
      },

      {
        path: "/product/:productId",
        element: (
          <ProtectedRoute>
            <SingleProduct />
          </ProtectedRoute>
        ),
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
      {
        path: "/login",
        element: <Login />,
      },
    ],
    errorElement: <Error />,
  },
]);

export default router;
