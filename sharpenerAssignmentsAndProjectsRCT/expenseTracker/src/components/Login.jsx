import { useState } from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { useNavigate, Link } from "react-router-dom";
import VerifyEmail from "./VerifyEmail";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../contexts/authSlice";

const Login = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = loginData;

  const isLogin = useSelector((store) => store.authentication.token);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onChangeHandler = (e) => {
    setLoginData((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  };
  const loginUser = async (data) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_LOGIN_URL}${import.meta.env.VITE_AUTH_KEY}`,
        {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (res.ok) {
        const resData = await res.json();
        console.log(resData);
        dispatch(login(resData));

        setTimeout(() => {
          alert("Token Expired please login.");
          dispatch(logout());
        }, 3600000);
        navigate("/");
      } else {
        const resData = await res.json();
        throw new Error(resData.error.message);
      }
    } catch (error) {
      alert(error.message);
    }
  };
  const submitHandler = (e) => {
    e.preventDefault();
    loginUser({ email, password, returnSecureToken: true });
  };
  return (
    <>
      <Row className="mt-5 justify-content-center">
        <Col md={5}>
          <Form className="shadow p-5 rounded-2 " onSubmit={submitHandler}>
            <Form.Group as={Row} className="mb-3" controlId="email_login">
              <Form.Label column sm="2">
                Email
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  name="email"
                  type="email"
                  value={email}
                  onChange={onChangeHandler}
                  required={true}
                  placeholder="Enter email"
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="password_login">
              <Form.Label column sm="2">
                Password
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  type="password"
                  value={password}
                  placeholder="Password"
                  name="password"
                  onChange={onChangeHandler}
                  required={true}
                />
              </Col>
            </Form.Group>
            <Row>
              <Col className="text-center">
                <Button className="mt-3" variant="primary" type="submit">
                  Login
                </Button>
              </Col>
              <Col md={12} className="text-center mt-3 ">
                <Link className="link-primary fs-6 " to="/login/forgotPassword">
                  Forgot password?
                </Link>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
      <Row className="justify-content-evenly mx-auto ">
        <Col md={12} className="text-center ">
          <Button
            onClick={() => navigate("/signup")}
            variant="light"
            className="text-black shadow mt-3 "
            type="button"
          >
            Don&apos;t have an account? Sign Up
          </Button>
        </Col>
      </Row>
      {!!isLogin && <VerifyEmail email={email} />}
    </>
  );
};

export default Login;
