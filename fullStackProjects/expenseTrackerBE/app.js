const express = require("express");
const app = express();
const sequelize = require("./utils/database");
const User = require("./models/user");
const Expense = require("./models/expense");
const cors = require("cors");

app.use(cors());
app.use(express.json());
const authRoutes = require("./routes/authRoutes");
const expenseRoutes = require("./routes/expenseRoutes");
app.use("/user", authRoutes);
app.use("/expense", expenseRoutes);

User.hasMany(Expense);
Expense.belongsTo(User);

sequelize
  .sync({ force: false })
  .then((res) => {
    console.log("Connection established");
  })
  .catch((err) => {
    console.log(err);
  });
app.listen(3000, () => {
  console.log("server started on port 3000");
});
