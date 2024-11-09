const express = require("express");
const router = express.Router();

const login = router.route("/login").get((req, res) => {
  res.send(
    `<form action="/" onsubmit='localStorage.setItem("username",document.getElementById("username").value)'><input id="username" type="text" placeholder="Enter username"><button type="submit">Login</button></form>`
  );
});

module.exports = router;
