const path = require("path");

const express = require("express");

// const rootDir = require("../util/path");
// const adminData = require("./admin");

const router = express.Router();
const { getProducts } = require("../controllers/products");
router.get("/", getProducts);

module.exports = router;
