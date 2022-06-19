const Joi = require('joi'); 

const registerAfipSchema = Joi.object({
    user: Joi.string(),
    password: Joi.allow(),
    businessId:Joi.allow(),
    puntoVenta:Joi.allow(),
    files:Joi.array()
}); 

module.exports = {
    registerAfipSchema
};