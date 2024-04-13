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
import Composer from "./components/Composer";
import { Outlet, createBrowserRouter } from "react-router-dom";
import AllMails from "./components/AllMails";
import MailList from "./components/MailList";
import SingleMailPage from "./components/SingleMailPage";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "./store/authenticationSlice";
import { getMails, sendMailData } from "./store/mail-actions";
let isFirstTimeLoading = true;

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
    if (isFirstTimeLoading) {
      isFirstTimeLoading = false;
      dispatch(getMails());
      return;
    }
    if (mailData) {
      dispatch(sendMailData(mailData));
    }
  }, [mailData]);
  return (
    <>
      <Header />
      <Outlet>
        <Container fluid>
          <Signup />
          <Login />
          <Welcome />
          <Composer />
          <AllMails />
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
      {
        path: "/compose",
        element: <Composer />,
      },
      {
        path: "/mails",
        element: <AllMails />,
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
