const express = require("express");
const User = require("../models/user");
const router = express.Router();
const { signupUser } = require("../controllers/auth");
const { loginUser } = require("../controllers/auth");
router.post("/signup", signupUser);

router.post("/login", loginUser);

module.exports = router;
