const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use("/add-product", (req, res, next) => {
  res.send(
    `<form action="/product" method="POST"> <input type="text" name="title"><input type="number" name="size"><button type="submit">Add Product</button></form>`
  );
});

app.post("/product", (req, res, next) => {
  console.log(req.body);
  res.redirect("/");
});
app.use("/", (req, res, next) => {
  console.log("In the middleware number 2..");
  res.send("<h1>Hello from express js</h1>");
});
// const server = http.createServer(app);

app.listen(3000);
