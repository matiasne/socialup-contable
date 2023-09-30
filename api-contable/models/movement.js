const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MovementSchema = Schema(
  {
    sale: { type: mongoose.Schema.Types.ObjectId, ref: "Sale" },
    box: { type: mongoose.Schema.Types.ObjectId, ref: "Box" },
    amount: String,
    type: String,
    boxAmount: Number
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Movement", MovementSchema);