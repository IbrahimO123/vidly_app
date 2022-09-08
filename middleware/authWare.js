const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function (req, res, next) {
  const token = req.header("x-jwt-token");
  if (!token) return res.status(401).send("Access denied.No token available.");
  try {
    const decoded = jwt.verify(token, config.get("jwtPrivateKey"));
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(400).send("Invalid token.");
  }
};
