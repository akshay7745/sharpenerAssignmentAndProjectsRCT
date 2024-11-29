const express = require("express");
const User = require("../models/user");
const Attendance = require("../models/attendance");
const router = express.Router();

router.get("/users", async (req, res, next) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {}
});
router.get("/attendanceReport", async (req, res, next) => {
  try {
    // const users = await Attendance.findAll({ include: { User } });
    const attendance = await User.findAll({ include: Attendance });

    res.status(200).json({ attendance });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong while fetching users",
      error,
    });
  }
});
router.get("/attendance/:date", async (req, res, next) => {
  try {
    const { date } = req.params;
    const attendance = await Attendance.findAll({
      where: { date: date },
      include: User,
    });

    console.log(
      "Getting attendance of specific date with users**************************",
      attendance
    );
    res.status(200).json({ message: `Attendance of date ${date}`, attendance });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong while getting attendance data",
      error,
    });
  }
});
router.get("/attendance", async (req, res, next) => {
  try {
    const attendance = await Attendance.findAll({ include: User });

    console.log(
      "Getting attendance with users**************************",
      attendance
    );
    res.status(200).json(attendance);
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong while getting attendance data",
      error,
    });
  }
});
router.post("/attendance", async (req, res, next) => {
  console.log("********************************************* body ", req.body);

  let date = req.body.date;
  delete req.body.date;
  const attendance = [];
  for (let key in req.body) {
    attendance.push({
      userId: +key,
      date,
      attendance: req.body[key] === "present" ? true : false,
    });
  }
  console.log(
    "Attendance modified*********************************** ",
    attendance
  );
  try {
    const postedAttendance = await Attendance.bulkCreate(attendance);

    const newAttendance = await Attendance.findAll({
      where: {
        date: date,
      },
      include: User,
    });
    res.status(201).json({
      message: "Here we will get posted attendance data",
      attendance: newAttendance,
    });
  } catch (error) {
    res.status(501).json({
      message: "Something went wrong while posting attendance",
      error,
    });
  }
});

module.exports = router;
