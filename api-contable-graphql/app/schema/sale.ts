const mongoose = require("mongoose");
//import mongoose from "mongoose";


const schema = new mongoose.Schema({
  business: { type: mongoose.Schema.Types.ObjectId, ref: "Business" },
  client: { type: mongoose.Schema.Types.ObjectId, ref: "Client" },
  product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
  total: { type: Number, required: false, unique: false, minlength: 1 },
  payments: { type: String, required: false, unique: false, minlength: 1 },
  variations: { type: String, required: false, unique: false, minlength: 1 },
  billingDate: { type: String, required: false, unique: false, minlength: 1 },
  status: { type: String, required: false, unique: false, minlength: 2 },
  box: { type: mongoose.Schema.Types.ObjectId, ref: "Box" },

});
export default mongoose.model("Sale", schema);
