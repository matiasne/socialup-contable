const Joi = require('joi'); 

const createUserSchema = Joi.object({
  name: Joi.string().min(1).max(30).required(),
  surname: Joi.string().min(1).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().pattern(new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[.,;:#?!@$%^&*-]).{8,16}$')),
  role: Joi.string()
  //image: Joi.string()
}); 

const updateUserSchema = Joi.object({
  id: Joi.string(),
  name: Joi.string().min(1).max(30).required(),
  surname: Joi.string().min(1).max(30).required(),
  direccion: Joi.string().min(1).max(50).required(),
  password: Joi.string().pattern(new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[.,;:#?!@$%^&*-]).{8,16}$')),
  role: Joi.string(),
  image: Joi.string()
}); 

const getUserLogin = Joi.object({
  email: Joi.string().email() .required(),
  password: Joi.string().pattern(new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[.,;:#?!@$%^&*-]).{8,16}$')).required()
}); 

module.exports = {
    createUserSchema,
    updateUserSchema,
    getUserLogin
};

