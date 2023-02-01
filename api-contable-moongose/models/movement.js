const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MovementSchema = Schema(
  {
    idSale: { type: mongoose.Schema.Types.ObjectId, ref: "Sales" },
    amount: String,
    type: String,
    boxAmount: Number
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Movement", MovementSchema);