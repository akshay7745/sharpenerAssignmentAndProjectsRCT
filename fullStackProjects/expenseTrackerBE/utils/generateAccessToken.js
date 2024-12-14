const jwt = require("jsonwebtoken");

function generateAccessToken(name, id, email, isPremium) {
  const token = jwt.sign(
    { name, id, email, isPremium },
    process.env.SECRET_TOKEN_KEY
  );

  return token;
}

module.exports = generateAccessToken;
