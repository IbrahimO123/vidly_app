const winston = require('winston');
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const express = require("express");
const { urlencoded } = require('express');
const app = express();

app.use(urlencoded({extended: false}));

require("express-async-errors");
require("./startup/config")();
require("./startup/logging")();
require("./startup/dB")();
require("./startup/routes")(app);
require("/startup/prod")(app);

const port = process.env.PORT || 5500;

//app listening
const server = app.listen(port, () => winston.info("Listening on port " + port + "..."));

module.exports = server;