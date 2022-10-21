"use strict";

const express = require("express");
const BusinessController = require("../controllers/business");
const ClientController = require("../controllers/client");
const md_auth = require("../middlewares/authenticated");
const md_uploadFile = require("../middlewares/upload-file");
const { saveClientSchema, updateClientSchema} = require("../validationSchema/client.schema");
const validationSchema = require("../middlewares/requestValidation");

var api = express.Router();

api.get("/client/:id", md_auth.ensureAuth, ClientController.getClient);
api.put("/client/:_id", validationSchema(updateClientSchema), md_auth.ensureAuth, md_uploadFile.single("image"),
 ClientController.updateClient
);
api.delete("/client/:id", md_auth.ensureAuth, ClientController.deleteClient);
api.post("/client", validationSchema(saveClientSchema), md_uploadFile.single("image"), ClientController.addClient);
api.get("/client/file/:imageFile", ClientController.getClientImageFile);
api.get("/business/:idBusiness/clients", md_auth.ensureAuth, ClientController.getBusinessClients);

module.exports = api;
