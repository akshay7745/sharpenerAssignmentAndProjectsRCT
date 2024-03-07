import { useState, useContext } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useNavigate } from "react-router-dom";
import authContext from "../contexts/authContext";
const Login = () => {
  const [formState, setFormState] = useState({ email: "", password: "" });
  const { handleLogin } = useContext(authContext);
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    loginRequest(formState);
  };

  const handleChange = (e) => {
    setFormState((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  };

  const loginRequest = async (data) => {
    try {
      const res = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCB10Q6a5p0jTcYwYXRu5YHzmOQ8UefSy4",
        {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!res.ok) {
        const resData = await res.json();
        const err = resData.error.message;
        throw new Error(err);
      }
      const resData = await res.json();

      handleLogin(resData.idToken, data.email);
      navigate("/product");
    } catch (error) {
      alert(error);
    }
  };
  return (
    <Row className="justify-content-center " style={{ marginTop: "100px" }}>
      <Col md={5}>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="name@example.com"
              name="email"
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              name="password"
              onChange={handleChange}
            />
          </Form.Group>
          <Button variant="info" type="submit">
            Login
          </Button>
        </Form>
      </Col>
    </Row>
  );
};

export default Login;
