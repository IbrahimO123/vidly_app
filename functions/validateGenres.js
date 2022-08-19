const Joi = require("joi");

function validateGenre(genre) {
  const schema = Joi.object({
    name: Joi.string().alphanum().min(3).required(),
    title: Joi.string().min(5).required(),
  });

  const validResult = schema.validate(genre);

  return validResult;
}

module.exports = validateGenre;
