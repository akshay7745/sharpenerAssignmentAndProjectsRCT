const path = require("path");
const getProduct = (req, res, next) => {
  res.sendFile(path.join(__dirname, "..", "views", "add-product.html"));
};

const createProduct = (req, res) => {
  console.log(req.body);
  res.redirect("/shop");
};

module.exports = { getProduct, createProduct };
