import { useState } from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
const SignUp = () => {
  const [signUpData, setSignUpData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const { email, password, confirmPassword } = signUpData;
  const onChangeHandler = (e) => {
    setSignUpData((prevState) => {
      return { ...prevState, [e.target.id]: e.target.value };
    });
  };
  const registerUser = async (data) => {
    try {
      const res = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCB10Q6a5p0jTcYwYXRu5YHzmOQ8UefSy4`,
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
        console.log("User has been successfully registered");
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
    <Form onSubmit={submitHandler}>
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
      <Form.Group as={Row} className="mb-3" controlId="confirmPassword">
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
      <Button variant="primary" type="submit">
        Sign Up
      </Button>
    </Form>
  );
};

export default SignUp;
