const express = require("express");
const path = require("path");
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const contactusRoutes = require("./routes/contactus");
const bodyParser = require("body-parser");
const successRoutes = require("./routes/success");
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use("/admin", adminRoutes);
app.use("/shop", shopRoutes);
app.use("/contactus", contactusRoutes);
app.use("/success", successRoutes);
app.use((req, res, next) => {
  res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
});
app.listen(3000, () => {
  console.log("App is listening on port number 3000");
});
