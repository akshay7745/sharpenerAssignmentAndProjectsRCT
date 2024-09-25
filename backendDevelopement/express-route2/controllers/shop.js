const path = require("path");

const shop = (req, res) => {
  res.sendFile(path.join(__dirname, "..", "views", "shop.html"));
};

const contactus = (req, res, next) => {
  res.sendFile(path.join(__dirname, "..", "views", "contact-us.html"));
};

const success = (req, res) => {
  res.sendFile(path.join(__dirname, "..", "views", "success.html"));
};

module.exports = { shop, contactus, success };
