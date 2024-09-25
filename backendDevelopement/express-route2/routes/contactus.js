const express = require("express");
const router = express.Router();
const { contactus } = require("../controllers/shop");

router.get("/", contactus);

module.exports = router;
