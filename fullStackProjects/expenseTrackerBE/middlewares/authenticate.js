const jwt = require("jsonwebtoken");
const User = require("../models/user");

exports.authenticate = async (req, res, next) => {
  try {
    const token = req.header("Authorization");

    const userData = jwt.verify(token, process.env.SECRET_TOKEN_KEY);
    const user = await User.findByPk(userData.id);

    req.user = user;

    next();
  } catch (error) {
    console.log(
      "Something went wrong while authenticating in middleware",
      error
    );
  }
};
