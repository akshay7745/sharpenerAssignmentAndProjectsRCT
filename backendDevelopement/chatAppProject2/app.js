const express = require("express");

const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
const loginRoutes = require("./routes/loginRoutes");
const chatRoutes = require("./routes/chatRoutes");
app.use(loginRoutes);
app.use(chatRoutes);

app.listen(4000, () => {
  console.log(`Server is up and running on port number ${4000}`);
});
