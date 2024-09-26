const express = require("express");
const path = require("path");
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const contactusRoutes = require("./routes/contactus");
const bodyParser = require("body-parser");
const successRoutes = require("./routes/success");
const app = express();
const { errorController } = require("./controllers/404page");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use("/admin", adminRoutes);
app.use("/shop", shopRoutes);
app.use("/contactus", contactusRoutes);
app.use("/success", successRoutes);
app.use(errorController);
app.listen(3000, () => {
  console.log("App is listening on port number 3000");
});
