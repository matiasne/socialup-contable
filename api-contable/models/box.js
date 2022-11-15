const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BoxSchema = Schema(
  {
    idBusiness: { type: mongoose.Schema.Types.ObjectId, ref: "Businesses" },
    name: String,
    status: String,
    actualAmount: Number,
    image: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Box", BoxSchema);
