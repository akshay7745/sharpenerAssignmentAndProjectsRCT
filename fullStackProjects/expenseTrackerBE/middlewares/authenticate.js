const jwt = require("jsonwebtoken");
const User = require("../models/user");

exports.authenticate = async (req, res, next) => {
  try {
    const token = req.header("Authorization");
    console.log("Getting token in each request", token, req.method);
    const userData = jwt.verify(
      token,
      "alksoisolwlwmowwwwooww125475sjjiosslklww"
    );
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
