const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.json());
const routes = require("./routes/companyRoutes");
app.use("/", routes);

const Company = require("./models/company");

const Review = require("./models/review");

Company.hasMany(Review);
Review.belongsTo(Company);

const sequelize = require("./utils/database");
sequelize
  .sync({ force: false })
  .then((res) => {
    console.log("Connection established");
  })
  .catch((err) => {
    console.log(err);
  });
app.listen(3000, () => {
  console.log("listening on port 3000");
});
