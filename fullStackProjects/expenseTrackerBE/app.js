const express = require("express");
const app = express();
require("dotenv").config();
const sequelize = require("./utils/database");
const User = require("./models/user");
const Expense = require("./models/expense");
const cors = require("cors");
const Order = require("./models/order");
app.use(cors());
app.use(express.json());
const authRoutes = require("./routes/authRoutes");
const expenseRoutes = require("./routes/expenseRoutes");
const purchaseRoutes = require("./routes/purchaseRoutes");
const premiumRoutes = require("./routes/premiumRoutes");
app.use("/user", authRoutes);
app.use("/expense", expenseRoutes);
app.use("/purchase", purchaseRoutes);
app.use("/premium", premiumRoutes);
User.hasMany(Expense);
Expense.belongsTo(User);
User.hasMany(Order);
Order.belongsTo(User);

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
