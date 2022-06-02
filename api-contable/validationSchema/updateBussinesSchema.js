const Joi = require('joi'); 

const updateBussinesSchema = Joi.object({
    _id: Joi.string(),
    name: Joi.allow(),
    address:Joi.allow(),
    category:Joi.allow(),
    email:Joi.allow(),
    phone:Joi.allow(),
    image:Joi.allow()
  }); 

module.exports = {
    updateBussinesSchema
};