const Joi = require('joi'); 
const passwordComplexity = require("joi-password-complexity");

const complexityOptions = {
  min: 8,
  max: 16,
  lowerCase: 1,
  upperCase: 1,
  numeric: 1,
  symbol: 1,
  requirementCount: 4,
};

const createUserSchema = Joi.object({
  name: Joi.string().min(1).max(30).required(),
  surname: Joi.string().min(1).max(30).required(),
  email: Joi.string().email().required(),
  password: passwordComplexity(complexityOptions),
  //role: Joi.string()
  //image: Joi.string()
}); 

const updateUserSchema = Joi.object({
  id: Joi.string(),
  name: Joi.string().min(1).max(30).required(),
  surname: Joi.string().min(1).max(30).required(),
  direccion: Joi.string().min(1).max(50).required(),
  password: passwordComplexity(complexityOptions),
  role: Joi.string(),
  image: Joi.string()
}); 

const getUserLogin = Joi.object({
  email: Joi.string().email() .required(),
  password: passwordComplexity(complexityOptions).required()
}); 

module.exports = {
    createUserSchema,
    updateUserSchema,
    getUserLogin
};

