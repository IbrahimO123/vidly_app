module.exports = function (req, res, next) {
  try {
    if (!req.user.isAdmin) return res.status(403).send("Access Denied");
    next();
  } catch (err) {
    return res.status(401).send(err.message);
  }
};
