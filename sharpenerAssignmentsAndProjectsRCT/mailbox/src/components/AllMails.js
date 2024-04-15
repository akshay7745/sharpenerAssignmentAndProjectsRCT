import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import MailList from "./MailList";
import SingleMailPage from "./SingleMailPage";
import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
const AllMails = () => {
  // const [mails, setMails] = useState([]);
  const [switchMails, setSwitchMails] = useState({
    inbox: true,
    sent: false,
    draft: false,
  });
  const userData = useSelector((state) => state.authentication.userData);
  // const mails = useSelector((state) => state.mails.mailData);
  const emails = useSelector((state) => state.mails.mailData);
  console.log(emails, "from line number 21 all mails component...");
  const inboxMails = emails.filter((mail) => mail.receiver === userData.userId);

  const unreadMails = inboxMails?.filter((mail) => mail.isRead === false);
  const navigate = useNavigate();
  function trimString(str, maxLength) {
    if (str.length > maxLength) {
      // Clip the string to the desired length and add an ellipsis
      return str.slice(0, maxLength - 1) + "...";
    }
    return str; // If the string is already within the limit, return it as is
  }
  // useEffect(() => {
  //   async function getEmails() {
  //     try {
  //       const res = await fetch(
  //         `https://mailbody-7480c-default-rtdb.firebaseio.com/mails.json`
  //       );
  //       if (!res.ok) {
  //         const resData = await res.json();
  //         console.log(resData.Error.message);
  //       }
  //       const resData = await res.json();
  //       console.log(resData, "from line number 20");
  //       const allKeys = Object.keys(resData);
  //       const allData = Object.values(resData).map((data, index) => {
  //         const { sender, receiver, body, title } = data;
  //         return { sender, receiver, body, title, id: allKeys[index] };
  //       });
  //       setMails(allData);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  //   getEmails();
  // }, []);
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div>
        <Row className="justify-content-center mt-5">
          <Col md={6}>
            <Form>
              <InputGroup className="mb-3">
                <Form.Control
                  placeholder="Recipient's username"
                  aria-label="Recipient's username"
                  aria-describedby="basic-addon2"
                />
                {/* <InputGroup.Text id="basic-addon2">@example.com</InputGroup.Text> */}
                <Button>Search mails</Button>
              </InputGroup>
            </Form>
          </Col>
        </Row>
      </div>
      <div style={{ display: "flex", border: "1px solid black" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            width: "20%",
            borderRight: "1px solid black",
            paddingTop: "30px",
          }}
        >
          <Button
            onClick={() => {
              navigate("/compose");
            }}
            className="ms-2"
          >
            Compose
          </Button>
          <ul
            style={{
              listStyle: "none",
              textAlign: "left",
              width: "100%",
              padding: "10px",
            }}
          >
            <li
              style={{
                borderBottom: "1px solid black",
                fontWeight: "bold",
                marginBottom: "5px",
              }}
              onClick={() => {
                setSwitchMails({
                  inbox: true,
                  sent: false,
                  draft: false,
                });
              }}
            >
              Inbox <span>({unreadMails?.length || 0} unread)</span>
            </li>
            <li
              style={{
                borderBottom: "1px solid black",
                fontWeight: "bold",
                marginBottom: "5px",
              }}
              onClick={() => {
                setSwitchMails({
                  inbox: false,
                  sent: true,
                  draft: false,
                });
              }}
            >
              Sent
            </li>
            <li
              style={{ borderBottom: "1px solid black", fontWeight: "bold" }}
              onClick={() => {
                setSwitchMails({
                  inbox: false,
                  sent: false,
                  draft: true,
                });
              }}
            >
              Draft
            </li>
          </ul>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "70%",
            paddingTop: "20px",
          }}
        >
          {/* <Outlet context={{ mails, trimString }}> */}
          <Outlet context={{ trimString, switchMails }}>
            <MailList />
            <SingleMailPage />
          </Outlet>
        </div>
      </div>
    </div>
  );
};

export default AllMails;