"use strict";

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var SaleSchema = Schema(
  {
    idBusiness: { type: mongoose.Schema.Types.ObjectId, ref: "Businesses" },
    idClient: { type: mongoose.Schema.Types.ObjectId, ref: "Clients" },
    business: {},
    client: {},
    item: [],
    total: Number,
    payments: [],
    variations: [],
    billingDate: Date,
    status: {},
    boxId: { type: mongoose.Schema.Types.ObjectId, ref: "Boxes" },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Sale", SaleSchema);
