"use strict";

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var BusinessSchema = Schema({
    idUser: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
    name: String,
    address: String,
    category: String,
    email: String,
    image: String,
    phone: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Business", BusinessSchema);
