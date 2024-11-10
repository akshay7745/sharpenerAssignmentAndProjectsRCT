const express = require("express");
const router = express.Router();
const rootDir = require("../utils/path");
const path = require("path");

router.post("/", (req, res, next) => {
  res.sendFile(path.join(rootDir, "views", "success.html"));
});

module.exports = router;
