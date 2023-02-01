const Joi = require('joi'); 

const saveProductSchema = Joi.object({
    _id: Joi.string(),
    name: Joi.allow(),
    description: Joi.allow(),
    code:Joi.allow(),
    costPrice: Joi.allow(),
    salePrice:Joi.allow(),
    image:Joi.allow()
  });

  const updateProductSchema = Joi.object({
    _id: Joi.string(),
    name: Joi.allow(),
    description: Joi.allow(),
    code:Joi.allow(),
    costPrice: Joi.allow(),
    salePrice:Joi.allow(),
    image:Joi.allow()
  });

  module.exports = {
    saveProductSchema,
    updateProductSchema
};
