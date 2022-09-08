const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const config = require("config");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 255,
  },

  email: {
    type: String,
    unique: true,
    minlength: 5,
    maxlength: 255,
  },
  password: {
    type: String,
    minlength: 7,
    maxlength: 200,
  },
  isAdmin: {
    type: Boolean,
    required: true,
    default: false,
  },
});

userSchema.methods.generateToken = function () {
  const token = jwt.sign(
    { _id: this.id, isAdmin: this.isAdmin },
    config.get("jwtPrivateKey")
  );
  return token;
};

const Users = mongoose.model("User", userSchema);

module.exports.Users = Users;
module.exports.userSchema = userSchema;
