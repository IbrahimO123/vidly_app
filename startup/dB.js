const mongoose = require("mongoose");
const winston = require("winston");
const config = require("config");

module.exports = function () {
  //connecting to mongoose
  const db = config.get("db")
  mongoose
    .connect(db)
    .then(() => winston.info(`Connected to ${db} database...`));
};
