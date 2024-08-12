import React, { useState } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import EditorBody from "./EditorBody";

import { addMail } from "../store/mailSlice";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
function Composer() {
  const [mailData, setMailData] = useState({
    sender: "",
    receiver: "",
    title: "",
    body: "",
    bodyInText: "",
    deletedByReceiver: false,
    deletedBySender: false,
  });
  const navigate = useNavigate();
  const userData = useSelector((state) => state.authentication.userData);
  const dispatch = useDispatch();
  const bodyChangeHandler = (data) => {
    setMailData((prevState) => {
      return { ...prevState, body: data.body, bodyInText: data.bodyInText };
    });
  };
  const { receiver, title } = mailData;
  const changeHandler = (e) => {
    setMailData((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    alert("Sending is in progress.");
    dispatch(addMail({ ...mailData, sender: userData.userId }));
    navigate("/mails");
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
            required={true}
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
            required={true}
          />
        </Form.Group>

        <EditorBody bodyChangeHandler={bodyChangeHandler} />
        <Button
          className="fixed-bottom"
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
