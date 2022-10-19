const express = require("express");
const BoxController = require("../controllers/box");
const md_auth = require("../middlewares/authenticated");

const api = express.Router();

api.get("/box/:_id", md_auth.ensureAuth, BoxController.getBox);
api.get("/box/", md_auth.ensureAuth, BoxController.getBoxs);
api.put("/box/:_id", md_auth.ensureAuth, BoxController.updateBox);
api.delete("/box/:_id", md_auth.ensureAuth, BoxController.deleteBox);
api.post("/box", BoxController.createBox); //md_auth.ensureAuth,

module.exports = api;
