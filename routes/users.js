const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();
const validateUsers = require("../functions/validateUsers");
const { Users } = require("../schemas/userSchema");
const _ = require("lodash");
const authWare = require("../middleware/authWare");

router.use(express.json());

router.get("/me", authWare, async (req, res) => {
  const user = await Users.findById(req.user._id).select("-password");
  if (!req.user._id) return res.status(400).send("Invalid user ID provided");
  return res.status(200).send(user);
});

router.post("/", async (req, res) => {
  const { error, value } = validateUsers(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  let newUser = await Users.findOne({ email: req.body.email });
  if (newUser)
    return res
      .status(400)
      .send("User already registered with the given email.");
  const extractData = _.pick(req.body, [
    "name",
    "email",
    "password",
    "isAdmin",
  ]);
  newUser = new Users(extractData);
  const salt = await bcrypt.genSalt();
  newUser.password = await bcrypt.hash(extractData.password, salt);
  await newUser.save();
  const token = newUser.generateToken();
  const displayData = _.pick(newUser, ["_id", "name", "email"]);
  return res.header("x-jwt-token", token).send(displayData);
});

module.exports = router;
