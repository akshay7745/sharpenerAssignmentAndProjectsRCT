const express = require("express");

const app = express();

// how to implement routing in express

// here the code is running from top to bottom so that if I am calling '/about' and if at top '/' route is present then it will call that route ("/") so to avoid this place the routes accordingly
app.use("/add-product", (req, res) => {
  res.send("<h1>This is add product page</h1>");
});

app.use("/", (req, res) => {
  res.send("<h1>Hello from express</h1>");
});

// add another route to the app

app.listen("3000", () => {
  console.log("server is up...");
});
