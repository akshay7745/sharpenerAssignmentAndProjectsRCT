const express = require("express");

const router = express.Router();
const rootDir = require("../utils/path");

const path = require("path");
router.get("/", (req, res, next) => {
  console.log("In the middleware number 2..");
  res.sendFile(path.join(rootDir, "views", "shop.html"));
});

module.exports = router;
