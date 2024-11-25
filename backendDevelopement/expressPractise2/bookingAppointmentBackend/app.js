const express = require("express");
const cors = require("cors");

const app = express();
const userRoutes = require("./routes/user");
app.use(cors());
app.use(express.json());
app.use("/", userRoutes);
const sequelize = require("./utils/database");

sequelize
  .sync({ force: false })
  .then((result) => {
    app.listen(3000, () => {
      console.log(`Server is up and running on port number 3000`);
    });
  })
  .catch((err) => {
    console.log("Something went wrong while connecting with db", err);
  });
