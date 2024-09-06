const express = require("express");

const router = express.Router();

router.get("/add-product", (req, res, next) => {
  res.send(
    `<html><head><title>Send data</title></head><body><form action="/admin/product" method="post"><input type="text" name="title" placeholder="Enter Title"><input type="text" placeholder="Enter Product Size" name="size"><button type="submit">Send Data</button> </form></body>`
  );
});

router.post("/product", (req, res) => {
  console.log(req.body);
  res.redirect("/");
});

module.exports = router;
