import { useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const setNewPassword = async (data) => {
    try {
      setIsLoading(true);
      const res = await fetch(
        `${import.meta.env.VITE_AUTH_URL}${import.meta.env.VITE_AUTH_KEY}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      if (res.ok) {
        const resData = await res.json();
        console.log(resData);
        setIsLoading(false);
      } else {
        const resData = await res.json();
        const err = resData.error.message;
        console.log(resData);
        throw new Error(err);
      }
    } catch (error) {
      setIsLoading(false);
      alert(error.message);
    }
  };
  const navigate = useNavigate();
  const onChangeHandler = (e) => {
    setEmail(e.target.value);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    setNewPassword({ requestType: "PASSWORD_RESET", email: email });
  };
  if (isLoading) {
    return <h2>Loading please wait....</h2>;
  }
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
                  placeholder="Enter registered email"
                />
              </Col>
            </Form.Group>
            <Row>
              <Col className="text-center">
                <Button className="mt-3" variant="primary" type="submit">
                  Send Link
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

export default ForgotPassword;
