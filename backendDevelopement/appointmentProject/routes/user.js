const express = require("express");

const router = express.Router();
const User = require("../models/user");
router.route("/get-users").get((req, res) => {
  User.findAll().then((users) => {
    res.json({
      users,
      success: true,
      message: "Users fetched successfully...",
    });
  });
});
router.route("/").get((req, res) => {
  res.send("Home page");
});

// we can also use async function here in post method and then we can replace it with .then
//eg=> router.route("/add-user").post(async (req, res) => {
//})
router.route("/add-user").post((req, res) => {
  console.log("printing req body", req.body);
  const { name, phonenumber, email } = req.body;
  User.create({
    name,
    phonenumber,
    email,
  })
    .then((result) => {
      console.log("this is the result after creating user", result);
      res.status(201).json({
        message: "Sending data to db",
        result,
      });
    })
    .catch((err) => {
      console.log("Something went wrong while creating the user", err);
      res.json({
        message: "Something went wrong",
        error: err,
      });
    });
});

router.route("/delete-user/:userId").delete((req, res) => {
  console.log("printing parameters", req.params);
  const { userId } = req.params;
  User.findByPk(userId)
    .then((user) => {
      return user.destroy();
    })
    .then((result) => {
      console.log("User deleted successfully");
      res.json({
        success: true,
        result,
      });
    });
});
router.route("/edit-user/:userId").put((req, res) => {
  res.send("Editing user data");
  const { userId } = req.params;
  const { name, email, phonenumber } = req.body;
  User.findByPk(userId)
    .then((user) => {
      user.name = name;
      user.email = email;
      user.phonenumber = phonenumber;

      return user.save();
    })
    .then((result) => {
      console.log("after delete", result);
      res.json({
        success: true,
        result,
      });
    });
});

module.exports = router;
