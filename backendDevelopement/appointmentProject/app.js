const express = require("express");
const routes = require("./routes/user");
const app = express();
const cors = require("cors");
const sequelize = require("./utils/database");
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/user", routes);

sequelize
  .sync()
  .then((result) => {
    console.log("Created table or retrieved");
    app.listen(3000, () => {
      console.log(`App is running on port number ${3000}`);
    });
  })
  .catch((err) => console.log(err));
