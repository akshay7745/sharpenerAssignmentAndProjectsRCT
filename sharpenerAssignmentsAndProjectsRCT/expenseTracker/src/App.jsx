import React, { useContext } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import { authContext } from "./contexts/AuthContextProvider";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./components/Home";
const App = () => {
  const { isAuthenticated } = useContext(authContext);
  return (
    <div>
      <Container fluid>
        <SignUp />
        <Login />
        <Home />
      </Container>
    </div>
  );
};

export const router = createBrowserRouter([
  {
    path: "/",
    element: <SignUp />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/home",
    element: <Home />,
  },
]);

export default App;
