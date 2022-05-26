'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AfipSchema = Schema({
    comercioId:String,
    razonSocial:String,
    tipoDoc:String,
    nroDoc:String,
    personaJuridica:String,        
    ingresosBrutos:String,
    ptoVenta:String,
    fechaInicioActividades:String 
})

module.exports = mongoose.model('Afip', AfipSchema)