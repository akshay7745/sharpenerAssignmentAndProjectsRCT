import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

const SingleMailPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [singleMail, setMail] = useState({
    title: "",
    body: "",
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
    <div style={{ padding: "10px" }}>
      <div>
        <h5> From:- {sender}</h5>
        <div>
          <h5>To:- {receiver}</h5>
          <h6 style={{ border: "1px solid black", padding: "5px" }}>
            Title:- {title}
          </h6>
          <p>
            <span style={{ fontWeight: "bold" }}>Message:-</span> {body}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SingleMailPage;
