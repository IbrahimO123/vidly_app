const Joi = require("joi");

function validateAuth(user) {
    const schema = Joi.object({
      email: Joi.string().email().trim().required().min(5).max(255),
      password: Joi.string().trim().required().min(7).max(200),
    });
  
    const validResult = schema.validate(user);
  
    return validResult;
  }
  
  module.exports = validateAuth;