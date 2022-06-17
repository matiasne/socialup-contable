'use strict' 

var express = require('express');
var BusinessController = require('../controllers/business')
var ClientController =require('../controllers/client')
var md_auth = require('../middlewares/authenticated');
var md_uploadFile = require('../middlewares/upload-file')


var api = express.Router();

api.get('/client/:id', md_auth.ensureAuth, ClientController.getClient);
api.put('/client/:_id', [ md_auth.ensureAuth, md_uploadFile.single('image')], ClientController.updateClient);
api.delete('/client/:id', md_auth.ensureAuth, ClientController.deleteClient);
api.post('/client', md_uploadFile.single('image'), ClientController.addClient);
api.get('/client/file/:imageFile',ClientController.getClientImageFile);
api.get('/business/:idBusiness/clients',md_auth.ensureAuth,ClientController.getBusinessClients);


module.exports = api;