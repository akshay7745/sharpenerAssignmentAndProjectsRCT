const User = require("../models/user");

exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.findAll({});
    res.status(200).json(users);
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

exports.createUser = async (req, res, next) => {
  try {
    const userData = req.body;
    if (!userData.phonenumber) {
      throw new Error("Phone number is mandatory...");
    }
    console.log("Req body", req.body);
    const user = await User.create(userData);
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.deleteUser = async (req, res, next) => {
  const { id } = req.params;
  try {
    if (!id || id == "") {
      throw new Error("Please enter valid id");
    }
    const user = await User.destroy({
      where: {
        id: id,
      },
    });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id || id == "") {
      throw new Error("Enter valid id");
    }
    const updatedUserId = await User.update(req.body, {
      where: {
        id: id,
      },
    });
    const updatedUser = await User.findByPk(id);
    res.status(200).json({ updatedUser });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
