const express = require("express");
const router = express.Router();
const rootDir = require("../utils/path");
const path = require("path");
const success = require("../controllers/success");
router.post("/", success);

module.exports = router;
