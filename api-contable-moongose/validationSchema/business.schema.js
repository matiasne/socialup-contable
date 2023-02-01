const Joi = require('joi'); 

const postBusinessSchema = Joi.object({
    _id: Joi.string(), //TODO .required()
    name: Joi.allow(),  //TODO string().min(1).max(30).required()
    address:Joi.allow(),  //TODO string().required()
    category:Joi.allow(), //TODO string().min(1).max(30).required()
    email:Joi.allow(), //TODO .email().required()
    phone:Joi.allow(), //TODO .string().required()
    image:Joi.allow()
  }); 

  const updateBusinessSchema = Joi.object({
    _id: Joi.string(),
    name: Joi.allow(),
    address:Joi.allow(),
    category:Joi.allow(),
    email:Joi.allow(),
    phone:Joi.allow(),
    image:Joi.allow(),
    idUser:Joi.allow()
  }); 

module.exports = {
    postBusinessSchema,
    updateBusinessSchema
};