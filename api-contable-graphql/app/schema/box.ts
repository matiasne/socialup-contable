const mongoose = require("mongoose");
//import mongoose from "mongoose";

const schema = new mongoose.Schema({
  business: { type: mongoose.Schema.Types.ObjectId, ref: "Business" },
  name: { type: String, required: true, unique: false, minlength: 2 },
  status: { type: String, required: false, unique: false, minlength: 2 },
  actualAmount: { type: String, required: false, unique: false, minlength: 2 },
  image: { type: String, required: false, unique: false, minlength: 3 },
  dailyAmount: { type: String, required: false, unique: false, minlength: 3 },
  sale: [{ type: mongoose.Schema.Types.ObjectId, ref: "Sale" }],
});
export default mongoose.model("Box", schema);
