import { useReducer } from "react";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { login } from "../store/authenticationSlice";
import { useDispatch } from "react-redux";
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
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const sendToTheBackend = async (data) => {
    try {
      const res = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAK671JMI_OjI6n3Cme0FO9sQn5oTuOVM0`,
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
      alert("Successfully Logged in");
      localStorage.setItem(
        "userData",
        JSON.stringify({ userId: resData.email, token: resData.idToken })
      );
      dispatch(login({ userId: resData.email, token: resData.idToken }));
      navigate("/mails");
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
        `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyCB10Q6a5p0jTcYwYXRu5YHzmOQ8UefSy4`,
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
          {/* <div className="d-grid gap-2">
            <Button
              className="rounded-pill"
              type="button"
              variant="link"
              onClick={() => updatePassword()}
            >
              Forgot password?
            </Button>
          </div> */}
        </Form>
        <Row className="justify-content-center mt-4">
          <Col md={12}>
            <div className="d-grid gap-2">
              <Button
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
  );
}

export default Login;
