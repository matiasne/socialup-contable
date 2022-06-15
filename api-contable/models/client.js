'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var clientSchema = Schema({
    idBusiness : {type: mongoose.Schema.Types.ObjectId,ref:'Businesses'},
    name: String,
    surname: String,
    address:String,
    email: String,
    image: String,
    phone: String, 
    postCode:String,
    city:String,
    cuit_cuil:String,
},{
    timestamps: true
})

module.exports = mongoose.model('Business', clientSchema)