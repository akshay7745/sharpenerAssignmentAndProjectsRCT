import { useContext, useState } from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { authContext } from "../contexts/AuthContextProvider";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [signUpData, setSignUpData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const { handleToken } = useContext(authContext);
  const { email, password } = signUpData;
  const onChangeHandler = (e) => {
    setSignUpData((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  };
  const loginUser = async (data) => {
    try {
      const res = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCB10Q6a5p0jTcYwYXRu5YHzmOQ8UefSy4`,
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
        console.log(resData.idToken, "login credentials after json");
        handleToken(resData.idToken);
        console.log("Login successful");
        navigate("/home");
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
            </Row>
          </Form>
        </Col>
      </Row>
      <Row className="justify-content-evenly mx-auto ">
        <Col md={12} className="text-center ">
          <Button
            onClick={() => navigate("/")}
            variant="light"
            className="text-black shadow mt-3 "
            type="button"
          >
            Don&apos;t have an account? Sign Up
          </Button>
        </Col>
      </Row>
    </>
  );
};

export default Login;
