const jwt = require("jsonwebtoken");

function generateAccessToken(name, id, email) {
  const token = jwt.sign(
    { name, id, email },
    "alksoisolwlwmowwwwooww125475sjjiosslklww"
  );

  return token;
}

module.exports = generateAccessToken;
