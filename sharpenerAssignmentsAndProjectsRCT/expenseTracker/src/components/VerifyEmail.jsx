import Button from "react-bootstrap/esm/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import { useSelector } from "react-redux";
const VerifyEmail = ({ email }) => {
  const token = useSelector((store) => store.authentication.token);
  const checkEmail = async (data) => {
    try {
      const res = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyCB10Q6a5p0jTcYwYXRu5YHzmOQ8UefSy4`,
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
      }
    } catch (error) {
      console.log(error);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    checkEmail({ requestType: "VERIFY_EMAIL", idToken: token });
  };
  return (
    <Row style={{ height: "100vh" }} className="justify-content-center ">
      <Col md={4}>
        <Form onSubmit={submitHandler} className="p-5 shadow mt-5">
          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              value={email}
              type="email"
              placeholder="name@example.com"
            />
          </Form.Group>

          <Row>
            <Col>
              <Button type="submit">Verify Email</Button>
            </Col>
          </Row>
        </Form>
      </Col>
    </Row>
  );
};

export default VerifyEmail;
