const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EstimateSchema = Schema(
  {
    business: { type: mongoose.Schema.Types.ObjectId, ref: "Businesses" },
    client: { type: mongoose.Schema.Types.ObjectId, ref: "Clients" },
    _business: {},
    _client: {},
    items: [],
    total: Number,
    variations: [],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Estimate", EstimateSchema);
