const express = require("express");

const router = express.Router();
const path = require("path");

router.route("/").post((req, res) => {
  res.sendFile(path.join(__dirname, "..", "views", "success.html"));
});

module.exports = router;
