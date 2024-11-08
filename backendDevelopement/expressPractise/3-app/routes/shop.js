const express = require("express");

const router = express.Router();

router.get("/", (req, res, next) => {
  console.log("In the middleware number 2..");
  res.send("<h1>Hello from express js</h1>");
});

module.exports = router;
