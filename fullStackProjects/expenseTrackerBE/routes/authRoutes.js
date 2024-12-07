const express = require("express");
const User = require("../models/user");
const router = express.Router();
const { signupUser } = require("../controllers/auth");
router.post("/signup", signupUser);

module.exports = router;
