const Joi = require("joi");

const saveSalechema = Joi.object({
  _id: Joi.string(),
  business: Joi.allow(),
  client: Joi.allow(),
  items: Joi.allow(),
  total: Joi.allow(),
  variations: Joi.allow(),
});

module.exports = {
  saveSalechema,
};
