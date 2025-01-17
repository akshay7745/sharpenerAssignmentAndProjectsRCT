const express = require("express");
const app = express();
require("dotenv").config();
const sequelize = require("./utils/database");
const User = require("./models/user");
const Expense = require("./models/expense");
const cors = require("cors");
const Order = require("./models/order");
const ForgotPasswordRequest = require("./models/forgotPasswordRequest");
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const authRoutes = require("./routes/authRoutes");
const expenseRoutes = require("./routes/expenseRoutes");
const purchaseRoutes = require("./routes/purchaseRoutes");
const premiumRoutes = require("./routes/premiumRoutes");
const passwordRoutes = require("./routes/passwordRoutes");

app.use("/user", authRoutes);
app.use("/expense", expenseRoutes);
app.use("/purchase", purchaseRoutes);
app.use("/premium", premiumRoutes);
app.use("/password", passwordRoutes);

User.hasMany(Expense);
Expense.belongsTo(User);
User.hasMany(Order);
Order.belongsTo(User);

User.hasMany(ForgotPasswordRequest);
ForgotPasswordRequest.belongsTo(User);

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
