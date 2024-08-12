import React from "react";
import { Link, useOutletContext } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  mailDeletedByReceiver,
  mailDeletedBySender,
  markAsRead,
} from "../store/mailSlice";
import Button from "react-bootstrap/Button";
const MailList = () => {
  function trimString(str, maxLength) {
    if (str.length > maxLength) {
      return str.slice(0, maxLength - 1) + "...";
    }
    return str; // If the string is already within the limit, return it as is
  }
  const { switchMails } = useOutletContext();
  const { inbox, sent, draft } = switchMails;
  const mails = useSelector((state) => state.mails.mailData);
  const userData = useSelector((state) => state.authentication.userData);
  const inboxMails = mails?.filter(
    (mail) =>
      mail.receiver === userData.userId && mail.deletedByReceiver === false
  );
  const sentMails = mails?.filter(
    (mail) => mail.sender === userData.userId && mail.deletedBySender === false
  );
  const dispatch = useDispatch();
  let mailData = [];
  if (inbox) {
    mailData = inboxMails;
  } else if (sent) {
    mailData = sentMails;
  }
  return (
    <>
      {inbox && <h2>Inbox</h2>}
      {sent && <h2>Sent Mails</h2>}
      {draft && <h2>Drafts</h2>}
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
                  borderRadius: "5px",
                }}
                key={mail.id}
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
                <span>{trimString(mail.bodyInText, 60)}</span>
                <Link to={`/mails/${mail.id}`}>
                  {" "}
                  <span
                    onClick={() => {
                      if (inbox) {
                        dispatch(markAsRead(mail.id));
                      }
                    }}
                  >
                    Read mail
                  </span>
                </Link>
              </li>
              <div style={{ position: "relative" }}>
                <Button
                  variant="danger"
                  className=""
                  style={{ position: "absolute", right: 0, top: -45 }}
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
              </div>
            </>
          );
        })}
      </ul>
    </>
  );
};

export default MailList;
