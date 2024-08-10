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
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyApDxpgju0nO_NOSQnT7CMSoHqhNlinWFg",
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
    <>
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
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
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

      {/* Provided user Credentials */}
      
      <div style={{ display: "flex" ,marginBottom:"160px"}}>
        <div
          style={{
            margin: "auto",
            width: "300px",
            border: "3px solid blue",
            borderRadius: "5px",
            padding: "4px 5px",
            textAlign: "center",
          }}
        >
          <p style={{ color: "red",fontSize:"20px"}}>
            <strong>User Credentials</strong>
          </p>
          <p>
            Email Id : <b>guest@gmail.com</b>
          </p>
          <p>
            Password: <b>123456</b>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
