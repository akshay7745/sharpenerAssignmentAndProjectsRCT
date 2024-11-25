const express = require("express");

const router = express.Router();

const {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/user");
router.get("/", getUsers);

router.post("/", createUser);
router.delete("/user/:id", deleteUser);

router.put("/user/:id", updateUser);

module.exports = router;
