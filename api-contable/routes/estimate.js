const express = require("express");
const EstimateController = require("../controllers/estimate");
const md_auth = require("../middlewares/authenticated");

const api = express.Router();
api.post("/estimate", EstimateController.saveEstimate);
api.get(
  "/business/:idBusiness/estimate",
  md_auth.ensureAuth,
  EstimateController.getEstimate
);

module.exports = api;
