const Joi = require('joi');
const { MIN_INPUT_LEN, MAX_INPUT_LEN } = require('./constants');

const validate = {
  createSkillSchema: Joi.string()
    .min(MIN_INPUT_LEN)
    .max(MAX_INPUT_LEN)
    .required(),
  skillIDSchema: Joi.string()
    .required(),
};

module.exports = validate;
