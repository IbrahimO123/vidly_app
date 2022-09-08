const Joi = require("joi");

function validateCustomer(customer) {
  const schema = Joi.object({
    isGold: Joi.boolean(),
    name: Joi.string().min(5).max(80).required(),
    phone: Joi.string().min(11).max(14).required(),
    email: Joi.string().email().trim().required().min(5).max(255),
  });

  const validResult = schema.validate(customer);

  return validResult;
}

module.exports = validateCustomer;