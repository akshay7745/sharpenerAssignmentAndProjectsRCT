const express = require("express");
const router = express.Router();
const rootDir = require("../utils/path");
const path = require("path");
router.get("/contactus", (req, res, next) => {
  res.sendFile(path.join(rootDir, "views", "contactus.html"));
});

module.exports = router;
