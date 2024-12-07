const express = require("express");
const app = express();
const sequelize = require("./utils/database");
const User = require("./models/user");
const cors = require("cors");

app.use(cors());
app.use(express.json());
const authRoutes = require("./routes/authRoutes");
app.use("/user", authRoutes);
sequelize
  .sync()
  .then((res) => {
    console.log("Connection established");
  })
  .catch((err) => {
    console.log(err);
  });
app.listen(3000, () => {
  console.log("server started on port 3000");
});
