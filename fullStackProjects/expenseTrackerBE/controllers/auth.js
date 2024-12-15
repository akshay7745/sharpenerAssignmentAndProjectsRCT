const User = require("../models/user");
const isStringInvalid = require("../utils/stringValidator");

const bcrypt = require("bcrypt");

const generateAccessToken = require("../utils/generateAccessToken");
const sequelize = require("../utils/database");

exports.signupUser = async (req, res, next) => {
  const t = await sequelize.transaction();
  try {
    const { name, email, password } = req.body;
    if (
      isStringInvalid(email) ||
      isStringInvalid(name) ||
      isStringInvalid(password)
    ) {
      throw new Error("Invalid input, please check email or name or password");
    }

    bcrypt.hash(password, 10, async (err, hash) => {
      if (err) {
        throw new Error("Something went wrong, please try again later.");
      }
      const newUser = await User.create(
        { name, email, password: hash },
        { transaction: t }
      );
      await t.commit();
      res.status(200).json({ message: "Signup successful", user: newUser });
    });
  } catch (error) {
    await t.rollback();
    res
      .status(501)
      .json({ error, message: "Something went wrong while sign up" });
  }
};

exports.loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (isStringInvalid(email) || isStringInvalid(password)) {
      throw new Error("Enter valid email and password");
    }
    const user = await User.findOne({ where: { email: email } });
    if (!user) {
      throw new Error("User doesn't exists");
    }

    bcrypt.compare(password, user.password, (err, result) => {
      if (err) {
        throw new Error("Something went wrong please try again");
      }
      if (result) {
        return res.status(200).json({
          success: true,
          token: generateAccessToken(
            user.name,
            user.id,
            user.email,
            user.isPremium
          ),
        });
      } else {
        throw new Error("Please check the password");
      }
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: error, message: "Something went wrong while login" });
  }
};
