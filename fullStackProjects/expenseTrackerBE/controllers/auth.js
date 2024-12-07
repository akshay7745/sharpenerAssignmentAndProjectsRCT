const User = require("../models/user");

exports.signupUser = async (req, res, next) => {
  try {
    console.log(req.body);

    const { name, email, password } = req.body;

    const newUser = await User.create({ email, name, password });

    res.status(200).json({ message: "Signup successful", user: newUser });
  } catch (error) {
    console.log(error.errors);
    res
      .status(404)
      .json({ error: error.errors[0].message, type: error.errors[0].type });
  }
};
