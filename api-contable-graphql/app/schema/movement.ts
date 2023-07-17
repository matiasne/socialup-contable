const mongoose = require("mongoose");
//import mongoose from "mongoose";

const schema = new mongoose.Schema({
  idBusiness: { type: mongoose.Schema.Types.ObjectId, ref: "Business" },
  TypeMovement: { type: String, require: true },
  actualBusiness: { type: Object, required: false },
  client: { type: mongoose.Schema.Types.ObjectId, ref: "Client" },
  actualClient: { type: Object, required: false },
  products: [{ type: Object }],
  box: { type: mongoose.Schema.Types.ObjectId, ref: "Box" },
  actualBox: [{ type: Object, required: false }],
  total: { type: Number, required: false, unique: false },
  payments: [{ type: String, required: false, unique: false }],
  variations: [{ type: String, required: false, unique: false }],
  billingDate: { type: String, required: false, unique: false },
  status: { type: String, required: false, unique: false },
});
export default mongoose.model("Movement", schema);
