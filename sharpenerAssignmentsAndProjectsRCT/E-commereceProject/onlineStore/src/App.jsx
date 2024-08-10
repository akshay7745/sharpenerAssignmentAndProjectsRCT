import Header from "./components/Header";
import Container from "react-bootstrap/Container";
import Footer from "./components/Footer";
import { useContext, useEffect, useState, lazy } from "react";
import { createBrowserRouter, Outlet } from "react-router-dom";
import About from "./components/About";
// import Body from "./components/Body";
const Body = lazy(() => import("./components/Body"));
import Error from "./components/Error";
import Home from "./components/Home";
import Cart from "./components/Cart";
import ContactUs from "./components/ContactUs";
// import SingleProduct from "./components/SingleProduct";
const SingleProduct = lazy(() => import("./components/SingleProduct"));
import Login from "./components/Login";
import ProtectedRoute from "./components/ProtectedRoute";
// import { Navigate } from "react-router-dom";
import authContext from "./contexts/authContext";
import cartContext from "./contexts/cartContext";
function App() {
  const { onAddToCart,show } =
    useContext(cartContext);
  const { isAuthenticated, userName } = useContext(authContext);
  const getCartData = async (userName) => {
    try {
      const res = await fetch(
        `https://crudcrud.com/api/c16c7885c56c4127b581ff185690f738/cart${userName}`
      );
     
      console.log(res);
      if (res.ok) {
        const resData = await res.json();
        console.log(resData,"resData from app after refreshing the page")
        onAddToCart(resData);
      } else {
        throw new Error("Something went wrong while fetching cart data");
      }
    } catch (error) {
      console.log(error, "From App");
    }
  };
  useEffect(() => {
    if (show && isAuthenticated) {
      getCartData(userName);
    }
  }, [show, userName, isAuthenticated]);

  return (
    <>
      <Cart />
      <Header />
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
