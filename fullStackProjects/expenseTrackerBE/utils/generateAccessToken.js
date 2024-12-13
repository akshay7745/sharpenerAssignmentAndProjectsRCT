const jwt = require("jsonwebtoken");

function generateAccessToken(name, id, email) {
  const token = jwt.sign({ name, id, email }, process.env.SECRET_TOKEN_KEY);

  return token;
}

module.exports = generateAccessToken;
