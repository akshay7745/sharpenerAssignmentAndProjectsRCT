import React, { useEffect, useState } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import EditorBody from "./EditorBody";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function Composer() {
  const [mailData, setMailData] = useState({
    sender: "akshay7745@gmail.com",
    receiver: "",
    title: "",
    body: "",
  });
  const bodyChangeHandler = (data) => {
    setMailData((prevState) => {
      return { ...prevState, body: data };
    });
  };
  const { receiver, title } = mailData;
  const changeHandler = (e) => {
    setMailData((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  };

  const sendMail = async (data) => {
    try {
      const res = await fetch(
        `https://mailbody-7480c-default-rtdb.firebaseio.com/mails.json`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      if (!res.ok) {
        const resData = await res.json();
        console.log(resData, "from line number 41");
        throw new Error(resData.error.message);
      }
      const resData = await res.json();
      console.log(resData);
    } catch (error) {
      console.log(error.message);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(mailData);

    sendMail({ ...mailData });
  };
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>To</Form.Label>
          <Form.Control
            type="email"
            className="border border-top-0 border-end-0 border-start-0 border-1 border-black  "
            placeholder="name@example.com"
            name="receiver"
            onChange={changeHandler}
            value={receiver}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Subject</Form.Label>
          <Form.Control
            type="text"
            className="border border-top-0 border-end-0 border-start-0 border-1 border-black "
            placeholder="Enter subject"
            name="title"
            onChange={changeHandler}
            value={title}
          />
        </Form.Group>

        <EditorBody bodyChangeHandler={bodyChangeHandler} />
        <Button
          className="fixed-bottom "
          style={{ marginTop: "325px" }}
          type="submit"
        >
          Send Mail
        </Button>
      </Form>
    </div>
  );
}

export default Composer;
