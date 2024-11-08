const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");
const app = express();

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

app.use(bodyParser.urlencoded({ extended: false }));

app.use("/admin", adminRoutes);
app.use("/shop", shopRoutes);

app.use((req, res) => {
  res.status(404).send("<h2>Page Not Found.</h2>");
});

app.listen(3000);
