import { useRef, useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const ContactUs = () => {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    number: "",
  });
  const { name, email, number } = formState;

  const handleSubmit = (e) => {
    e.preventDefault();
    formHandler();
  };
  async function formHandler() {
    try {
      const response = await fetch(
        `https://onlinestore-594cd-default-rtdb.firebaseio.com/contactus.json`,
        {
          method: "POST",
          body: JSON.stringify(formState),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        console.log(response);
        console.log("Thank you we will contact you shortly...");
      } else {
        throw new Error(
          "Something went wrong while submiting contact us form..."
        );
      }
    } catch (error) {
      console.log(error);
    }
  }
  const handleChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <Row className="justify-content-center " style={{ marginTop: "100px" }}>
      <Col md={5}>
        <Form onSubmit={handleSubmit}>
          <Form.Group as={Row} className="mb-3" controlId="formPlaintextName">
            <Form.Label column sm="2">
              Name
            </Form.Label>
            <Col sm="10">
              <Form.Control
                name="name"
                onChange={handleChange}
                value={name}
                type={"text"}
                placeholder="Enter Name"
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
            <Form.Label column sm="2">
              Email
            </Form.Label>
            <Col sm="10">
              <Form.Control
                value={email}
                name="email"
                onChange={handleChange}
                type="email"
                placeholder="email@example.com"
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3" controlId="phoneNumber">
            <Form.Label column sm="2">
              Phone Number
            </Form.Label>
            <Col sm="10">
              <Form.Control
                value={number}
                name="number"
                onChange={handleChange}
                placeholder="Number"
                type="number"
              />
            </Col>
          </Form.Group>
          <Col className="text-center ">
            <Button type="submit">Submit Store</Button>
          </Col>
        </Form>
      </Col>
    </Row>
  );
};

export default ContactUs;
