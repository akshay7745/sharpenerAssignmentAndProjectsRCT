const express = require("express");
const fs = require("fs");
const router = express.Router();

router.route("/login").get((req, res, next) => {
  res.send(
    `<html><head><title>Login Page</title></head><body><form action='/' onsubmit="localStorage.setItem('username', document.getElementById('username').value)"> <input id='username' type='text' placeholder='Please enter username'><button type='submit'>Login</button></form></body></html>`
  );
});

router
  .route("/")
  .get((req, res, next) => {
    fs.readFile("message.txt", "utf8", (err, data) => {
      if (err) {
        data = "No messages found";
      }
      return res.send(
        `<html><head><title>Message</title></head><body><div>${data}</div><form onsubmit="document.getElementById('username').value = localStorage.getItem('username')" action="/" method="POST"><input id="username" type='hidden' name='username'><input type="text" name="message" placeholder="Enter Message"><button type="submit">Send Message</button></form></body></html>`
      );
    });
  })
  .post((req, res, next) => {
    console.log("request body", req.body);
    fs.appendFile(
      "message.txt",
      `<div>${req.body.username}:${req.body.message}</div>`,
      (err) => {
        if (err) {
          console.log(err, "from a append file");
        }
      }
    );

    res.redirect("/");
  });

module.exports = router;
