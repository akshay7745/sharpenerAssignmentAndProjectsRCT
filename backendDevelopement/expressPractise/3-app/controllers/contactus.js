const rootDir = require("../utils/path");
const path = require("path");

const contactus = (req, res, next) => {
  res.sendFile(path.join(rootDir, "views", "contactus.html"));
};

module.exports = contactus;
