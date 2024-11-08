const express = require("express");
const http = require("http");

const app = express();

app.use((req, res, next) => {
  console.log("In the middleware number 1...");
  next();
});

app.use((req, res, next) => {
  console.log("In the middleware number 2..");
  res.send("<h1>Hello from express js</h1>");
  res.send({ key1: "value" });
});
// const server = http.createServer(app);

app.listen(3000);
