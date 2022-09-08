const config = require("config");

module.exports = function () {
  //check if the private key is not set in the environment variables
  if (!config.get("jwtPrivateKey")) {
    throw new Error("FATAI ERROR: JWT private key not specified");
  }
};
