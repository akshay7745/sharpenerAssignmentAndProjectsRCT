const express = require("express");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use("/admin", adminRoutes);
app.use("/shop", shopRoutes);

app.use((req, res, next) => {
  res
    .status(404)
    .send(`<h1 style="color:red; text-align:center;">Page Not Found!!!</h1>`);
});

app.listen(3000, () => {
  console.log("App is listening on port number 3000");
});
