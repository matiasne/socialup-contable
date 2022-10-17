"use strict";

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var SaleSchema = Schema(
  {
    idBusiness: { type: mongoose.Schema.Types.ObjectId, ref: "Businesses" },
    idClient: { type: mongoose.Schema.Types.ObjectId, ref: "Clients" },
    business: {},
    client: {},
    items: [],
    total: Number,
    payments: [],
    variations: [],
    billingDate: Date,
    status: []
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("sale", SaleSchema);
