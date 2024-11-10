const rootDir = require("../utils/path");
const path = require("path");

const success = (req, res, next) => {
  res.sendFile(path.join(rootDir, "views", "success.html"));
};

module.exports = success;
