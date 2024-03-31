import { useReducer, useState } from "react";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
const formReducer = (state, action) => {
  if (action.type === "EMAIL") {
    return { ...state, email: action.payload };
  } else if (action.type === "PASSWORD") {
    return {
      ...state,
      password: action.payload,
    };
  } else if (action.type === "CONFIRM-PASSWORD") {
    return {
      ...state,
      confirmPassword: action.payload,
    };
  } else if (action.type === "RESET-FORM") {
    return {
      email: "",
      password: "",
      confirmPassword: "",
    };
  }
};
const sendToTheBackend = async (data) => {
  try {
    if (data.password !== data.confirmPassword) {
      alert("Passwords should be same...");
      return;
    }
    const res = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCB10Q6a5p0jTcYwYXRu5YHzmOQ8UefSy4`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: data.email, password: data.password }),
      }
    );
    if (!res.ok) {
      const resData = await res.json();
      console.log(resData);
      throw new Error(resData.error.message);
    }
    const resData = await res.json();
    console.log(resData.idToken);
  } catch (error) {
    alert(error.message);
  }
};
function Signup() {
  const [signupState, signupDispatch] = useReducer(formReducer, {
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { email, password, confirmPassword } = signupState;
  const changeHandler = (e) => {
    if (e.target.name === "email") {
      signupDispatch({ type: "EMAIL", payload: e.target.value });
    } else if (e.target.name === "password") {
      signupDispatch({ type: "PASSWORD", payload: e.target.value });
    } else if (e.target.name === "confirmPassword") {
      signupDispatch({ type: "CONFIRM-PASSWORD", payload: e.target.value });
    }
  };
  const submitHandler = (event) => {
    event.preventDefault();

    console.log(signupState);
    sendToTheBackend(signupState);
  };
  return (
    <>
      <Form onSubmit={submitHandler} className="shadow p-3">
        <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
          <Form.Label column sm="2">
            Email
          </Form.Label>
          <Col sm="10">
            <Form.Control
              onChange={changeHandler}
              placeholder="Enter Email"
              name="email"
              value={email}
              type="email"
              required
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
          <Form.Label column sm="2">
            Password
          </Form.Label>
          <Col sm="10">
            <Form.Control
              name="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={changeHandler}
              required
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3" controlId="confirmPassword">
          <Form.Label column sm="2">
            Confirm Password
          </Form.Label>
          <Col className="mt-3" sm="10">
            <Form.Control
              name="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={changeHandler}
              required
            />
          </Col>
        </Form.Group>
        <div className="d-grid gap-2">
          <Button className="rounded-pill " type="submit" variant="primary">
            Signup
          </Button>
        </div>
      </Form>
      <Row className="justify-content-center mt-4">
        <Col md={12}>
          <div className="d-grid gap-2">
            <Button variant="outline-dark">
              Already Have an account? Login
            </Button>
          </div>
        </Col>
      </Row>
    </>
  );
}

export default Signup;
