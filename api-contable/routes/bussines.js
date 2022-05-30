'use strict'

var express = require('express');
var BussinesController = require('../controllers/bussines')
var md_auth = require('../middlewares/authenticated');
var md_uploadFile = require('../middlewares/upload-file')
const updateBussinesSchema = require('../validationSchema/updateBussinesSchema')
const postBussinesSchema = require('../validationSchema/postBussinesSchema')
const validationSchema = require('../middlewares/requestValidation');

var api = express.Router();

api.get('/bussines/:id', md_auth.ensureAuth, BussinesController.getBussines);
api.put('/bussines/:_id', [validationSchema(updateBussinesSchema), md_auth.ensureAuth, md_uploadFile.single('image')], BussinesController.updateBussines);
api.delete('/bussines/:id', md_auth.ensureAuth, BussinesController.deleteBussines);
api.post('/bussines', validationSchema(postBussinesSchema), BussinesController.addBussines);
api.get('/bussines/file/:imageFile',BussinesController.getBussinesImageFile);

module.exports = api;