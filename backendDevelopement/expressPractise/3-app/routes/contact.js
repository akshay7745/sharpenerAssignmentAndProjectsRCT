const express = require("express");
const router = express.Router();
// const rootDir = require("../utils/path");
// const path = require("path");
const contactus = require("../controllers/contactus");
router.get("/contactus", contactus);

module.exports = router;
