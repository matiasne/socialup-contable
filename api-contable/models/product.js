'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProductSchema = Schema({
    idBusiness : {type: mongoose.Schema.Types.ObjectId,ref:'Businesses'},
    name: String,
    description: String,
    code:String,
    costPrice: String,
    salePrice: String,
    image: String,    
   
},{
    timestamps: true
})

module.exports = mongoose.model('Product', ProductSchema)