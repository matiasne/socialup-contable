const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EstimateSchema = Schema(
  {
    idBusiness: { type: mongoose.Schema.Types.ObjectId, ref: "Businesses" },
    idClient: { type: mongoose.Schema.Types.ObjectId, ref: "Clients" },
    business: {},
    client: {},
    items: [],
    total: Number,
    variations: [],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("estimate", EstimateSchema);
