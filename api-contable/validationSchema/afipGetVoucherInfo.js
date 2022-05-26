const Joi = require('joi'); 

const afipGetVoucherInfoSchema = Joi.object({
    comercioId:Joi.string(),
    razonSocial:Joi.string(),
    tipoDoc:Joi.string(),
    nroDoc:Joi.string(),
    personaJuridica:Joi.string(),        
    ingresosBrutos:Joi.string(),
    ptoVenta:Joi.string(),
    fechaInicioActividades:Joi.string() 
});

module.exports = {
    afipGetVoucherInfoSchema,
};