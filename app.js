const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const port = process.env.PORT || 5500;
const genres = require("./routes/genres");
const customers = require("./routes/customers");
const home = require("./routes/home");
const movies = require("./routes/movies");
const rentals = require("./routes/rentals");

mongoose
  .connect("mongodb://localhost/vidly")
  .then(() => console.log("Connected to Vidly database..."))
  .catch((err) =>{return console.error(err.message)})

app.use("/api/rentals",rentals);
app.use("/api/customers", customers);
app.use("/api/movies", movies);
app.use("/api/genres", genres);
app.use("/", home);

app.listen(port, () => "Listening on port" + port + "...");
