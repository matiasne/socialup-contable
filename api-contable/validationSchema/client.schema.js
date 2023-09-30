const Joi = require('joi'); 

const saveClientSchema = Joi.object({
    _id: Joi.string(),
    name: Joi.allow(),
    surname: Joi.allow(),
    address:Joi.allow(),
    city: Joi.allow(),
    email:Joi.allow(),
    postCode:Joi.allow(),
    phone:Joi.allow(),
    documentType: Joi.allow(),
    documentNumber: Joi.allow(),
    image:Joi.allow()
  }); 

  const updateClientSchema = Joi.object({
    _id: Joi.string(),
    name: Joi.allow(),
    surname: Joi.allow(),
    address:Joi.allow(),
    city: Joi.allow(),
    email:Joi.allow(),
    postCode:Joi.allow(),
    phone:Joi.allow(),
    documentType: Joi.allow(),
    documentNumber: Joi.allow(),
    image:Joi.allow()
  }); 

  module.exports = {
    saveClientSchema,
    updateClientSchema
};
