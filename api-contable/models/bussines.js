'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BussinesSchema = Schema({
    name: String,
    address: String,
    category:String,
    email: String,
    image: String,
    phone: String
},{
    timestamps: true
})

module.exports = mongoose.model('Bussines', BussinesSchema)