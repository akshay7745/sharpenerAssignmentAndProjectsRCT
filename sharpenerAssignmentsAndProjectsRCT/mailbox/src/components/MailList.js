import React from "react";
import { Link, useOutletContext } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  mailDeletedByReceiver,
  mailDeletedBySender,
  markAsRead,
} from "../store/mailSlice";
import Button from "react-bootstrap/Button";
import { deleteMail } from "../store/mailSlice";
const MailList = () => {
  function trimString(str, maxLength) {
    if (str.length > maxLength) {
      // Clip the string to the desired length and add an ellipsis
      return str.slice(0, maxLength - 1) + "...";
    }
    return str; // If the string is already within the limit, return it as is
  }
  const { switchMails } = useOutletContext();
  const { inbox, sent } = switchMails;
  const mails = useSelector((state) => state.mails.mailData);
  const userData = useSelector((state) => state.authentication.userData);
  const inboxMails = mails.filter(
    (mail) =>
      mail.receiver === userData.userId && mail.deletedByReceiver === false
  );
  // const unreadMails = inboxMails?.filter((mail) => mail.isRead === false);
  const sentMails = mails.filter(
    (mail) => mail.sender === userData.userId && mail.deletedBySender === false
  );
  const dispatch = useDispatch();
  console.log("from mail list component ", mails);
  let mailData = [];
  if (inbox) {
    mailData = inboxMails;
  } else if (sent) {
    mailData = sentMails;
  }
  return (
    <>
      <h2>All Mails list</h2>
      <ul style={{ listStyle: "none", width: "100%" }}>
        {mailData?.map((mail) => {
          return (
            <>
              <li
                style={{
                  border: "1px solid black",
                  margin: "8px 0",
                  padding: "5px",
                  position: "relative",
                  paddingLeft: "25px",
                }}
                key={mail.id}
                onClick={() => {
                  if (inbox) {
                    dispatch(markAsRead(mail.id));
                  }
                }}
              >
                {!mail.isRead && inbox && (
                  <div
                    style={{
                      height: "12px",
                      width: "12px",
                      backgroundColor: "skyBlue",
                      borderRadius: "50%",
                      display: "inlineBlock",
                      position: "absolute",
                      top: 12,
                      left: 3,
                    }}
                  ></div>
                )}
                <span style={{ fontWeight: "bold" }}>Title-:</span>
                <span style={{ marginRight: "10px" }}>
                  {trimString(mail.title, 15)}.
                </span>
                <span style={{ fontWeight: "bold" }}>Body-: </span>
                <span>{trimString(mail.body, 40)}</span>
                <Link to={`/mails/${mail.id}`}>
                  {" "}
                  <span>Open mail</span>
                </Link>
              </li>
              <Button
                variant="danger"
                onClick={() => {
                  if (inbox) {
                    dispatch(mailDeletedByReceiver(mail.id));
                  } else {
                    dispatch(mailDeletedBySender(mail.id));
                  }
                }}
              >
                Delete
              </Button>
            </>
          );
        })}
      </ul>
    </>
  );
};

export default MailList;
