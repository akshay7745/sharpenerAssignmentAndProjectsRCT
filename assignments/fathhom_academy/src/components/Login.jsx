import { useReducer } from "react";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
// import { login } from "../store/authenticationSlice";
// import { useDispatch } from "react-redux";
const formReducer = (state, action) => {
  if (action.type === "EMAIL") {
    return { ...state, email: action.payload };
  } else if (action.type === "PASSWORD") {
    return {
      ...state,
      password: action.payload,
    };
  } else if (action.type === "RESET-FORM") {
    return {
      email: "",
      password: "",
    };
  }
};

function Login() {
  const [loginState, loginDispatch] = useReducer(formReducer, {
    email: "",
    password: "",
  });
  //   const dispatch = useDispatch();
  const navigate = useNavigate();
  //   const API_KEY = process.env.REACT_APP_WEB_API_KEY;
  const sendToTheBackend = async (data) => {
    try {
      const res = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${"AIzaSyApDxpgju0nO_NOSQnT7CMSoHqhNlinWFg"}`,
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
      alert("Successfully Logged in");
      localStorage.setItem(
        "userData",
        JSON.stringify({ userId: resData.email, token: resData.idToken })
      );
      //   dispatch(login({ userId: resData.email, token: resData.idToken }));
      navigate("/");
    } catch (error) {
      alert(error.message);
    }
  };
  const { email, password } = loginState;
  const changeHandler = (e) => {
    if (e.target.name === "email") {
      loginDispatch({ type: "EMAIL", payload: e.target.value });
    } else if (e.target.name === "password") {
      loginDispatch({ type: "PASSWORD", payload: e.target.value });
    }
  };

  const updatePassword = async (data) => {
    try {
      const res = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${"AIzaSyApDxpgju0nO_NOSQnT7CMSoHqhNlinWFg"}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            requestType: "PASSWORD_RESET",
            email: data.email,
          }),
        }
      );
      console.log(res, "from forgot password");
    } catch (error) {
      console.log(error);
    }
  };
  const submitHandler = (event) => {
    event.preventDefault();
    console.log(loginState);
    sendToTheBackend(loginState);
  };
  return (
    <Container>
      <Row className="justify-content-center mt-5 ">
        <Col className="" md={4}>
          <Form onSubmit={submitHandler} className="shadow p-3">
            <Form.Group as={Row} className="mb-3" controlId="email">
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

            <Form.Group as={Row} className="mb-3" controlId="password">
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

            <div className="d-grid gap-2">
              <Button className="rounded-pill " type="submit" variant="primary">
                Login
              </Button>
            </div>
          </Form>
          <Row className="justify-content-center mt-4">
            <Col md={12}>
              <div className="d-grid gap-2">
                <Button
                  disabled
                  onClick={() => {
                    navigate("/signup");
                  }}
                  variant="outline-dark"
                >
                  Don't Have an account? Signup
                </Button>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row className="mt-5">
        <Col className="text-center">
          <h2>Login credentials</h2>
          <p>
            {" "}
            email -: <span className="text-primary">guest@gmail.com</span>{" "}
          </p>
          <p>
            {" "}
            password -: <span className="text-primary">123456</span>
          </p>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;
