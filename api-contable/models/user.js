'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = Schema({
    name: String,
    surname: String,
    email: String,
    password: String,
    role: String,
    image: String,
    address: String,
    gender: String,
    phone: String,
    businesses : [{type: mongoose.Schema.Types.ObjectId,ref:'Bussines'}]
},{
    timestamps: true
})

module.exports = mongoose.model('User', UserSchema)