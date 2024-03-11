import Container from "react-bootstrap/Container";
// import Row from "react-bootstrap/Row";
// import Col from "react-bootstrap/Col";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
// import { authContext } from "./contexts/AuthContextProvider";
import { createBrowserRouter, Outlet } from "react-router-dom";
import Home from "./components/Home";
import Profile from "./components/Profile";
import VerifyEmail from "./components/VerifyEmail";
import Navigation from "./components/Navbar";
import ForgotPassword from "./components/ForgotPassword";

const App = () => {
  // const { isAuthenticated } = useContext(authContext);
  return (
    <>
      <Navigation />
      <Container fluid>
        <Outlet />
      </Container>
    </>
  );
};

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <h3>Something went wrong</h3>,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/",
        element: <SignUp />,
      },
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/login/verifyEmail",
        element: <VerifyEmail />,
      },
      {
        path: "/login/forgotPassword",
        element: <ForgotPassword />,
      },
    ],
  },
]);

export default App;
