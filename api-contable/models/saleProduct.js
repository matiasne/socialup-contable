'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Product = mongoose.model('Product');

var saleProduct = new Schema({
    amount: String,
    detail: String,
    subTotal: Number,
    variation:{},
    product: { type: Schema.ObjectId, ref: 'Product' }
});

module.exports = mongoose.model("SaleProduct", saleProductSchema);