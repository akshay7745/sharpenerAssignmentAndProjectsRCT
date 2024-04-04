import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
const AllMails = () => {
  const [mails, setMails] = useState([]);
  function trimString(str, maxLength) {
    if (str.length > maxLength) {
      // Clip the string to the desired length and add an ellipsis
      return str.slice(0, maxLength - 1) + "...";
    }
    return str; // If the string is already within the limit, return it as is
  }
  useEffect(() => {
    async function getEmails() {
      try {
        const res = await fetch(
          `https://mailbody-7480c-default-rtdb.firebaseio.com/mails.json`
        );
        if (!res.ok) {
          const resData = await res.json();
          console.log(resData.Error.message);
        }
        const resData = await res.json();
        console.log(resData, "from line number 20");
        const allKeys = Object.keys(resData);
        const allData = Object.values(resData).map((data, index) => {
          const { sender, receiver, body, title } = data;
          return { sender, receiver, body, title, id: allKeys[index] };
        });
        setMails(allData);
      } catch (error) {
        console.log(error);
      }
    }
    getEmails();
  }, []);
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
          <Button className="ms-2">Compose</Button>
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
            >
              Inbox
            </li>
            <li
              style={{
                borderBottom: "1px solid black",
                fontWeight: "bold",
                marginBottom: "5px",
              }}
            >
              Sent
            </li>
            <li style={{ borderBottom: "1px solid black", fontWeight: "bold" }}>
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
          <h2>All Mails list</h2>
          <ul style={{ listStyle: "none", width: "100%" }}>
            {mails?.map((mail) => {
              console.log(mail, "from line number 102");
              return (
                <li
                  style={{
                    border: "1px solid black",
                    margin: "8px 0",
                    padding: "5px",
                  }}
                  key={mail.id}
                >
                  <span style={{ fontWeight: "bold" }}>Title-:</span>{" "}
                  <span style={{ marginRight: "10px" }}>
                    {trimString(mail.title, 15)}.
                  </span>
                  <span style={{ fontWeight: "bold" }}>Body-: </span>
                  <span>{trimString(mail.body, 40)}</span>
                </li>
              );
            })}

            {/* <li
              style={{
                border: "1px solid black",
                margin: "8px 0",
                padding: "5px",
              }}
            >
              mail 2
            </li>
            <li
              style={{
                border: "1px solid black",
                margin: "8px 0",
                padding: "5px",
              }}
            >
              mail 3
            </li>
            <li
              style={{
                border: "1px solid black",
                margin: "8px 0",
                padding: "5px",
              }}
            >
              mail 4
            </li>
            <li
              style={{
                border: "1px solid black",
                margin: "8px 0",
                padding: "5px",
              }}
            >
              mail 5
            </li>
            <li
              style={{
                border: "1px solid black",
                margin: "8px 0",
                padding: "5px",
              }}
            >
              mail 6
            </li>
            <li
              style={{
                border: "1px solid black",
                margin: "8px 0",
                padding: "5px",
              }}
            >
              mail 7
            </li>
            <li
              style={{
                border: "1px solid black",
                margin: "8px 0",
                padding: "5px",
              }}
            >
              mail 8
            </li> */}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AllMails;
