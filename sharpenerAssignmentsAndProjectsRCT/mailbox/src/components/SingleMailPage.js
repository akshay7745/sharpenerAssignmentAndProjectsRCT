import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Button from "react-bootstrap/Button";
const SingleMailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [singleMail, setMail] = useState({
    title: "",
    body: "",
    bodyInText: "",
    sender: "",
    receiver: "",
    isRead: "",
  });

  const { body, sender, receiver, title, isRead } = singleMail;
  const mails = useSelector((state) => state.mails.mailData);
  const findMail = (id) => {
    const mail = mails.find((mail) => mail.id === id);
    if (mail) {
      setMail(mail);
    }
  };
  useEffect(() => {
    //   fetch(`https://mailbody-7480c-default-rtdb.firebaseio.com/mails/${id}.json`)
    //     .then((res) => {
    //       return res.json();
    //     })
    //     .then((resData) => {
    //       console.log(resData);
    //     })
    //     .catch((err) => console.log(err));
    findMail(id);
  }, []);
  return (
    <div style={{ padding: "10px", position: "relative", maxWidth: "600px" }}>
      <div>
        <h6> Sender:- {sender}</h6>
        <div>
          <h6>Receiver:- {receiver}</h6>
          <h6
            style={{
              border: "1px solid black",
              padding: "10px",
              borderRadius: "5px",
            }}
          >
            Title:- {title}
          </h6>
          <div
            style={{
              maxWidth: "575px",
              border: "1px solid black",
              padding: "15px",
              borderRadius: "5px",
            }}
          >
            <span style={{ fontWeight: "bold" }}>Message:-</span>{" "}
            <div dangerouslySetInnerHTML={{ __html: body }} />
          </div>
        </div>
      </div>
      <Button
        type="button"
        variant="warning"
        className="position-absolute top-0 end-0"
        onClick={() => {
          navigate("/mails");
        }}
      >
        Go Back
      </Button>
    </div>
  );
};

export default SingleMailPage;
