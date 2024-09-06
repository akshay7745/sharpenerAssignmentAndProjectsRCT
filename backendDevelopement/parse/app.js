const express = require("express");
const bodyParser = require("body-parser");

const app = express();
// This bodyParser is used to parse the form data and attach to the body prop of req , and to parse file and other type of data we have to use different body Parsers
// bodyParser.urlencoded() method at the end creates a middleware function and calls next at the end
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/", (req, res, next) => {
  console.log("This always runs!!!");
  next();
});

app.use("/add-product", (req, res, next) => {
  res.send(
    `<html><head><title>Send data</title></head><body><form action="/product" method="post"><input type="text" name="title" placeholder="Enter Title"><input type="text" placeholder="Enter Product Size" name="size"><button type="submit">Send Data</button> </form></body>`
  );
});

app.post("/product", (req, res) => {
  console.log(req.body);
  res.redirect("/");
});

app.use("/", (req, res) => {
  res.send("<h1>Hello from the express js</h1>");
});
app.listen(3000, () => {
  console.log("App is listening on port number 3000");
});
