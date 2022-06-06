const Joi = require('joi'); 

const postBusinessSchema = Joi.object({
    _id: Joi.string(),
    name: Joi.string().min(1).max(30),
    address:Joi.allow(),
    category:Joi.allow(),
    email:Joi.allow(),
    phone:Joi.allow(),
    image:Joi.allow()
  }); 

module.exports = {
    postBusinessSchema
};