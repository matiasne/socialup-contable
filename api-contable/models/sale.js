"use strict";

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var SaleSchema = Schema({
    idBusiness: { type: mongoose.Schema.Types.ObjectId, ref: "Businesses" },
    idClient: { type: mongoose.Schema.Types.ObjectId, ref: "Clients" },
    business: {},
    client: {},
    saleProducts: [],
    total: Number,
    payments: [],
    variations: [],
    billingDate: Date,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("sale", SaleSchema);
