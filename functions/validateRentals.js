const Joi = require("joi");

function validateRentals(rental) {
  const schema = Joi.object({
    customerId: Joi.objectId().required(),
    movieId: Joi.objectId().required(),
    dateOut : Joi.date(),
    dateReturned : Joi.date(),
    rentalFree: Joi.number()
  });

  const validResult = schema.validate(rental);

  return validResult;
}

module.exports = validateRentals;