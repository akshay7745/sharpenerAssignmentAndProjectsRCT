const express = require("express");

const app = express();
const sequelize = require("./util/database");
const expenseRoutes = require("./routes/expense.route");
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use("/expenses", expenseRoutes);
sequelize
  .sync()
  .then((result) => {
    console.log(
      "Connected to database, creating new table or retrieving old data"
    );
    app.listen(3000, () => {
      console.log(`Server is up and running.`);
    });
  })
  .catch((err) => {
    console.log("Something went wrong while connecting with db", err);
  });
