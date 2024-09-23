const express = require("express");
const bodyParser = require("body-parser");
const store = require("store2");
const app = express();
const fs = require("fs");
const loginRoute = require("./routes/route");
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/", loginRoute);

app.listen(3000, () => {
  console.log("App is running on the port number 3000");
});
