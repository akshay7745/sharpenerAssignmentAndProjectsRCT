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
