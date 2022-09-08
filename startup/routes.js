const genres = require("../routes/genres");
const customers = require("../routes/customers");
const home = require("../routes/home");
const movies = require("../routes/movies");
const rentals = require("../routes/rentals");
const users = require("../routes/users");
const auth = require("../routes/auth");
const error = require("../middleware/error");
const returns = require("../routes/returns")

module.exports = function (app) {
  //routes in vidly
  app.use("/api/returns", returns);
  app.use("/api/users", users);
  app.use("/api/login", auth);
  app.use("/api/rentals", rentals);
  app.use("/api/customers", customers);
  app.use("/api/movies", movies);
  app.use("/api/genres", genres);
  app.use("/", home);

  //error handling
  app.use(error);
};
