import { useState } from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
const SignUp = () => {
  const [signUpData, setSignUpData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const { email, password, confirmPassword } = signUpData;
  const navigate = useNavigate();
  const onChangeHandler = (e) => {
    setSignUpData((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  };
  const registerUser = async (data) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_SIGNUP_URL}${import.meta.env.VITE_AUTH_KEY}`,
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
        alert("User has been successfully registered");
        navigate("/login");
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
    registerUser({ email, password, returnSecureToken: true });
  };
  return (
    <>
      <Row className="mt-5 justify-content-center ">
        <Col md={5}>
          <Form className="shadow p-5 rounded-2 " onSubmit={submitHandler}>
            <Form.Group as={Row} className="mb-3" controlId="email">
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

            <Form.Group as={Row} className="mb-3" controlId="password">
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
            <Form.Group as={Row} controlId="confirmPassword">
              <Form.Label column sm="2">
                Confirm Password
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  type="password"
                  name="confirmPassword"
                  placeholder="Re-Enter Password"
                  value={confirmPassword}
                  onChange={onChangeHandler}
                  required={true}
                />
              </Col>
            </Form.Group>
            <Row>
              <Col className="text-center">
                <Button className="mt-2" variant="primary" type="submit">
                  Sign Up
                </Button>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
      <Row className="justify-content-center ">
        <Col className="text-center">
          <Button
            onClick={() => navigate("/login")}
            variant="light"
            className="text-black shadow mt-3 "
            type="button"
          >
            Already have an account? Login
          </Button>
        </Col>
      </Row>
    </>
  );
};

export default SignUp;
