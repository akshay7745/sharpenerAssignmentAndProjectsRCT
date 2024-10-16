const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use("/add-product", (req, res, next) => {
  res.send(
    '<form action="/product" method="POST"><input placeholder="Enter product name" type="text" name="title"><input type="number" placeholder="Enter product size" name="size"><button type="submit">Send Data</button></form>'
  );
});

app.post("/product", (req, res, next) => {
  console.log(req.body);
  res.redirect("/");
});
app.use("/", (req, res, next) => {
  res.send("<h1>Hello from express</h1>");
});
app.listen(4000);
