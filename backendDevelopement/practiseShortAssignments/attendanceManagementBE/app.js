const express = require("express");
const app = express();
const User = require("./models/user");
const Attendance = require("./models/attendance");
const sequelize = require("./utils/database");
const cors = require("cors");
const attendanceRoutes = require("./routes/attendance");
app.use(cors());
app.use(express.json());

app.use("/", attendanceRoutes);

User.hasMany(Attendance);

Attendance.belongsTo(User);

sequelize.sync({ force: false }).then((result) => {
  let users;
  User.findAll()
    .then((userData) => {
      if (userData.length > 0) {
        users = userData;
        return users;
      }

      return User.bulkCreate([
        { name: "akshay" },
        { name: "ajay" },
        { name: "sagar" },
        { name: "govind" },
        { name: "sunita" },
        { name: "gopal" },
        { name: "ramaa" },
        { name: "anand" },
      ]);
    })
    .then((data) => {
      //   console.log(data);
      console.log("User data fetched successfully.......");
    });
});

app.listen(3000, () => {
  console.log("Server is up and running on port number 3000");
});
