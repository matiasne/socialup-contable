const express = require("express");
const BoxController = require("../controllers/box");
var md_auth = require("../middlewares/authenticated");
var md_uploadFile = require("../middlewares/upload-file");

const api = express.Router();

api.get("/box/:_id", md_auth.ensureAuth, BoxController.getBox);
api.get("/business/:idBusiness/box", md_auth.ensureAuth, BoxController.getBoxs);
api.put(
  "/box/:_id",
  // [md_auth.ensureAuth, md_uploadFile.single("image")],
  BoxController.updateBox
);
api.delete("/box/:_id", md_auth.ensureAuth, BoxController.deleteBox);
api.post(
  "/box",
  [md_auth.ensureAuth, md_uploadFile.single("image")],
  BoxController.createBox
);

module.exports = api;
