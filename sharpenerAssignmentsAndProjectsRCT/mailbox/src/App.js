import "./App.css";
import Header from "./components/Header";
import Signup from "./components/Signup";
import Container from "react-bootstrap/Container";
import Login from "./components/Login";
import Composer from "./components/Composer";
import { Outlet, createBrowserRouter } from "react-router-dom";
import AllMails from "./components/AllMails";
import MailList from "./components/MailList";
import SingleMailPage from "./components/SingleMailPage";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "./store/authenticationSlice";
import { getMails, sendMailData } from "./store/mail-actions";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const dispatch = useDispatch();
  const mailData = useSelector((store) => store.mails.mailData);
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    if (userData) {
      dispatch(login(userData));
    }
  }, []);

  useEffect(() => {
    dispatch(getMails());
  }, []);
  useEffect(() => {
    if (mailData !== undefined || mailData !== null) {
      dispatch(sendMailData(mailData));
    }
  }, [mailData]);
  return (
    <>
      <Header />
      <Outlet>
        <Container fluid>
          <Composer />
          <AllMails />
          <Signup />
          <Login />
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
        element: (
          <ProtectedRoute>
            <Composer />
          </ProtectedRoute>
        ),
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/mails",
        element: (
          <ProtectedRoute>
            <AllMails />
          </ProtectedRoute>
        ),
        children: [
          {
            path: "/mails",
            element: <MailList />,
          },
          {
            path: "/mails/:id",
            element: <SingleMailPage />,
          },
        ],
      },
    ],
  },
]);
export default App;
