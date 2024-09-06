const http = require("http");

const express = require("express");

const app = express();
// here the callback passed into the use method is called middleware and that will be called for every request.
// The use of next() method is to funnel the request through the next middleware so when we call the next() is pass the req obj to the next middle ware
app.use((req, res, next) => {
  console.log("into the middleware...");
  next();
});

app.use((req, res) => {
  console.log("Into the another middleware...");
  res.send(
    `<h1 style="text-align:center; color:red; font-size:50px;font-weight:bold; margin-top:200px" >Hello Express</h1>`
  );
});
// const server = http.createServer(app);

// instead of the server.listen() we can use the app.listen()
// server.listen(3000, () => {
//   console.log("server is up ... :)");
// });

app.listen(3000, () => {
  console.log("server is up ... :)");
});
