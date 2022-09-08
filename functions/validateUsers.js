const Joi = require("joi");

function validateUsers(user) {
    const schema = Joi.object({
      name: Joi.string().required().trim().min(2).max(255),
      email: Joi.string().email().trim().required().min(5).max(255),
      password: Joi.string().trim().required().min(7).max(200),
      isAdmin : Joi.boolean().required().default(false),
    });
  
    const validResult = schema.validate(user);
  
    return validResult;
  }
  
  module.exports = validateUsers;