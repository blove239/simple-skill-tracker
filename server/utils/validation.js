const Joi = require('joi');

const validate = {
  createSkillSchema: Joi.string()
    .min(2)
    .max(30)
    .required(),
  skillIDSchema: Joi.string()
    .required(),
};

module.exports = validate;
