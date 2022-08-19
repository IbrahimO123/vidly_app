const Joi = require("joi");

function validateMovies(movie) {
  const schema = Joi.object({
    title: Joi.string().min(5).required(),
    genreId: Joi.objectId().required(),
    numberInStock: Joi.number().min(0),
    dailyRentalRate: Joi.number().min(0),
  });

  const validResult = schema.validate(movie);

  return validResult;
}

module.exports = validateMovies;
