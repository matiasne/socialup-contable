"use strict";

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ClientSchema = Schema({
    idBusiness: { type: mongoose.Schema.Types.ObjectId, ref: "Businesses" },
    name: String,
    image: String,
    city: String,
    address: String,
    email: String,
    phone: String,
    postCode: String,
    documentType: String,
    documentNumber: String,
    surname: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Client", ClientSchema);
