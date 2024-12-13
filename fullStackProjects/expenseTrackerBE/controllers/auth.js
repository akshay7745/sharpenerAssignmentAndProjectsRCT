const User = require("../models/user");
const isStringInvalid = require("../utils/stringValidator");

const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

const generateAccessToken = require("../utils/generateAccessToken");

exports.signupUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    if (
      isStringInvalid(email) ||
      isStringInvalid(name) ||
      isStringInvalid(password)
    ) {
      return res.status(400).json({ message: "Invalid input" });
    }

    bcrypt.hash(password, 10, async (err, hash) => {
      if (err) {
        throw new Error("Something went wrong, please try again later.");
      }
      const newUser = await User.create({ name, email, password: hash });
      res.status(200).json({ message: "Signup successful", user: newUser });
    });
  } catch (error) {
    console.log(error.errors);
    res
      .status(404)
      .json({ error: error.errors[0].message, type: error.errors[0].type });
  }
};

exports.loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (isStringInvalid(email) || isStringInvalid(password)) {
      return res
        .status(400)
        .json({ message: "Enter valid email and password" });
    }
    const user = await User.findOne({ where: { email: email } });
    if (!user) {
      return res.status(404).json({ message: "User doesn't exists" });
    }

    bcrypt.compare(password, user.password, (err, result) => {
      if (err) {
        throw new Error("Something went wrong please try again");
      }
      if (result) {
        return res.status(200).json({
          success: true,
          isPremium: user.isPremium,
          token: generateAccessToken(user.name, user.id, user.email),
        });
      } else {
        return res
          .status(401)
          .json({ success: false, message: "Please check the password" });
      }
    });
  } catch (error) {
    res.status(500).json({ error: error, message: "Internal Server Error" });
  }
};
