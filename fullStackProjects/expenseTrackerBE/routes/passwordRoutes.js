const express = require("express");
const router = express.Router();
const isStringInvalid = require("../utils/stringValidator");
const sequelize = require("../utils/database");
const { forgotPassword, resetPassword } = require("../controllers/password");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const ForgotPasswordRequest = require("../models/forgotPasswordRequest");

router.post("/forgotpassword", forgotPassword);

router.get("/resetpassword/:id", resetPassword);

router.post("/updatepassword", async (req, res, next) => {
  const t = await sequelize.transaction();
  try {
    const { email, password, uuid } = req.body;

    if (isStringInvalid(password)) {
      throw new Error("Invalid input, please check email or name or password");
    }
    const user = await User.findOne({
      where: {
        email,
      },
      transaction: t,
    });
    const forgotPassReq = await user.getForgotPasswordRequests({
      where: {
        id: uuid,
      },
      transaction: t,
    });
    console.log("******************************* forgotpassreq", forgotPassReq);
    if (forgotPassReq[0].isActive === false) {
      throw new Error("Password reset link expired");
    }
    const updateUiid = await forgotPassReq[0].update(
      { isActive: false },
      { transaction: t }
    );
    console.log("updatedUIId*************************", updateUiid);
    bcrypt.hash(password, 10, async (err, hash) => {
      if (err) {
        throw new Error("Something went wrong, please try again later.");
      }
      const updatedUser = await user.update(
        { password: hash },
        { transaction: t }
      );
      await t.commit();
      res.redirect(
        "C:UsersakshaOneDriveDesktopsharpenerAssignmentAndProjectsRCT\fullStackProjectsexpenseTrackerFElogin.html"
      );
      //   res
      //     .status(200)
      //     .json({ message: "Password updated successfully", user: updatedUser });
    });
  } catch (error) {
    console.log(error, "*********************************error");
    await t.rollback();
    res.json({ error: error.message });
  }
});

module.exports = router;
