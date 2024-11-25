const express = require("express");

const app = express();
const sequelize = require("./utils/database");
const cors = require("cors");
const expenseRoutes = require("./routes/expense");
app.use(cors());
app.use(express.json());

app.use("/", expenseRoutes);

sequelize
  .sync({ force: false })
  .then((res) => {
    app.listen(3000, () => {
      console.log(`server is up and running on port number 3000`);
    });
  })
  .catch((err) => {
    console.log("Something went wrong while connecting to database", err);
  });
