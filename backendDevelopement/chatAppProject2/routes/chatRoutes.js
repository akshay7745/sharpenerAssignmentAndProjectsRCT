const { channel } = require("diagnostics_channel");
const express = require("express");
const router = express.Router();
const fs = require("fs");

const userNameForm = router
  .route("/")
  .get((req, res) => {
    fs.readFile("text.txt", "utf8", (err, data) => {
      if (err) {
        data = null;
      }

      res.send(
        `<div><div>${
          data === null ? "No messages found" : data
        }</div><form action="/" method="POST" onsubmit="document.getElementById('user_name').value=localStorage.getItem('username')" ><input type="hidden" name='username' id="user_name"><input name='message' id="message" placeholder="Enter message" type="text"><button type="submit">Send Message</button></form></div>`
      );
    });
  })
  .post((req, res) => {
    const { username, message } = req.body;

    fs.appendFile("text.txt", `<div>${username}:-${message}</div>`, (err) => {
      if (err) {
        console.error(err);
      } else {
        // done!

        res.redirect("/");
      }
    });
  });

module.exports = router;
