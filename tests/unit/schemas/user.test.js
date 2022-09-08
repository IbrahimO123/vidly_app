const { Users, userSchema } = require("../../../schemas/userSchema");
const jwt = require("jsonwebtoken");
const config = require("config");
const mongoose = require("mongoose");

describe("UserSchema", () => {
  it("should create a token for a user", () => {
    const payload = {
      _id: new mongoose.Types.ObjectId(),
      isAdmin: true,
    };
    const user = new Users(payload);
    const token = user.generateToken();
    const decoded = jwt.verify(token, config.get("jwtPrivateKey"));
    expect(decoded).toMatchObject(payload);
  });
});