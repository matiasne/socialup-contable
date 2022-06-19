'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AfipSchema = Schema({
    email: String,
    password: String,
    puntoVenta:String,
    businessId:String,
},{
    timestamps: true
})

module.exports = mongoose.model('User', AfipSchema)