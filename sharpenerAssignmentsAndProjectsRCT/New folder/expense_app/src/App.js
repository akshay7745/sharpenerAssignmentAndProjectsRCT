import Container from "react-bootstrap/Container";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import { createBrowserRouter, Outlet } from "react-router-dom";
import Home from "./components/Home";
import Profile from "./components/Profile";
import VerifyEmail from "./components/VerifyEmail";
import Navigation from "./components/Navbar";
import ForgotPassword from "./components/ForgotPassword";
import ExpenseList from "./components/ExpenseList";
import ProtectedRoute from "./components/ProtectedRoute";
import { useSelector } from "react-redux";
const App = () => {
  const theme = useSelector((store) => store.theme.theme);
  return (
    <div style={theme}>
      <Navigation />
      <Container fluid>
        <Outlet />
      </Container>
      <h5>react</h5>
    </div>
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
        path: "/signup",
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
      {
        path: "/",
        element: (
          <ProtectedRoute>
            <ExpenseList />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

export default App;
