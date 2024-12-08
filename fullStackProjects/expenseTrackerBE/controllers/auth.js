const User = require("../models/user");
const isStringInvalid = require("../utils/stringValidator");
exports.signupUser = async (req, res, next) => {
  try {
    console.log(req.body);

    const { name, email, password } = req.body;
    if (
      isStringInvalid(email) ||
      isStringInvalid(name) ||
      isStringInvalid(password)
    ) {
      return res.status(400).json({ message: "Invalid input" });
    }
    const newUser = await User.create({ email, name, password });

    res.status(200).json({ message: "Signup successful", user: newUser });
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
      return res.status(400).json({ message: "Invalid input" });
    }
    const user = await User.findOne({ where: { email: email } });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (password !== user.password) {
      return res.status(401).json({ message: "Please provide valid password" });
    }

    return res.status(200).json({ message: "Login successful" });
  } catch (error) {
    res.status(500).json({ error: error, message: "Internal Server Error" });
  }
};
