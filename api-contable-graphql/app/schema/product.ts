const mongoose = require("mongoose");
//import mongoose from "mongoose";

const schema = new mongoose.Schema({
  name: { type: String, required: true, unique: false, minlength: 2 },
  description: { type: String, required: false, unique: false, minlength: 2 },
  codigo: { type: String, required: false, unique: false, minlength: 3 },
  costPrice: { type: String, required: false, unique: false, minlength: 1 },
  salePrice: { type: String, required: false, unique: false, minlength: 1 },
  image: { type: String, required: false, unique: false, minlength: 3 },
});
export default mongoose.model("Product", schema);
