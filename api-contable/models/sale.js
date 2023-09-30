"use strict";

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var SaleSchema = Schema(
  {
    business: { type: mongoose.Schema.Types.ObjectId, ref: "Businesses" },
    client: { type: mongoose.Schema.Types.ObjectId, ref: "Clients" },
    businessAtDate: {},
    clientAtDate: {},
    item: [],
    total: Number,
    payments: [],
    variations: [],
    billingDate: Date,
    status: {},
    box: { type: mongoose.Schema.Types.ObjectId, ref: "Box" },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Sale", SaleSchema);
