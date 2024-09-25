const express = require("express");
const { createProduct, getProduct } = require("../controllers/product");
const router = express.Router();

router.get("/add-product", getProduct);

router.post("/add-product", createProduct);

module.exports = router;
