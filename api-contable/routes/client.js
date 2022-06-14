'use strict' 

var express = require('express');
var BusinessController = require('../controllers/business')
var clientController =require('../controllers/client')
var md_auth = require('../middlewares/authenticated');
var md_uploadFile = require('../middlewares/upload-file')


var api = express.Router();

api.get('/client/:id', md_auth.ensureAuth, clientController.getClient);
api.put('/client/:_id', [ md_auth.ensureAuth, md_uploadFile.single('image')], clientController.updateClient);
api.delete('/client/:id', md_auth.ensureAuth, clientController.deleteClient);
api.post('/client', md_uploadFile.single('image'), clientController.addClient);
api.get('/client/file/:imageFile',clientController.getClientImageFile);


module.exports = api;