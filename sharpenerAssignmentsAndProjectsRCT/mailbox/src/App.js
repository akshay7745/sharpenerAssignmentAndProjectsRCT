import "./App.css";
import Welcome from "./components/Welcome";
import Stack from "react-bootstrap/Stack";
import Button from "react-bootstrap/Button";
import Header from "./components/Header";
import Signup from "./components/Signup";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Login from "./components/Login";
import { Outlet, createBrowserRouter } from "react-router-dom";
function App() {
  return (
    <>
      <Header />
      <Outlet>
        <Container fluid>
          <Signup />

          <Login />
          <Welcome />
        </Container>
      </Outlet>
    </>
  );
}

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Signup />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/welcome",
        element: <Welcome />,
      },
    ],
  },
]);
export default App;
