const express = require("express");
// const http = require("http");
const bodyParser = require("body-parser");
const app = express();
const path = require("path");
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const successRoutes = require("./routes/success");
const contactRoutes = require("./routes/contact");
const rootDir = require("./utils/path");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use("/admin", adminRoutes);
app.use("/shop", shopRoutes);
app.use("/", contactRoutes);
app.use("/success", successRoutes);

app.use("*", (req, res) => {
  res.status(404).sendFile(path.join(rootDir, "views", "not-found.html"));
});

app.listen(3000);
