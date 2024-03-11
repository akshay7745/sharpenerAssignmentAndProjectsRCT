import Container from "react-bootstrap/Container";
// import Row from "react-bootstrap/Row";
// import Col from "react-bootstrap/Col";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
// import { authContext } from "./contexts/AuthContextProvider";
import { createBrowserRouter } from "react-router-dom";
import Home from "./components/Home";
import Profile from "./components/Profile";
import VerifyEmail from "./components/VerifyEmail";
const App = () => {
  // const { isAuthenticated } = useContext(authContext);
  return (
    <div>
      <Container fluid>
        <SignUp />
        <Login />
        <Home />
        <Profile />
        <VerifyEmail />
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
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/login/verifyEmail",
    element: <VerifyEmail />,
  },
]);

export default App;
