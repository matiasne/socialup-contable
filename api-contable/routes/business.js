'use strict' 

var express = require('express');
var BusinessController = require('../controllers/business')
var md_auth = require('../middlewares/authenticated');
var md_uploadFile = require('../middlewares/upload-file')
const updateBusinessSchema = require('../validationSchema/updateBusinessSchema')
const postBusinessSchema = require('../validationSchema/postBusinessSchema')
const validationSchema = require('../middlewares/requestValidation');

var api = express.Router();

api.get('/business/:id', md_auth.ensureAuth, BusinessController.getBusiness);
api.put('/business/:_id', [validationSchema(updateBusinessSchema), md_auth.ensureAuth, md_uploadFile.single('image')], BusinessController.updateBusiness);
api.delete('/business/:id', md_auth.ensureAuth, BusinessController.deleteBusiness);
api.post('/business', validationSchema(postBusinessSchema),md_uploadFile.single('image'), BusinessController.addBusiness);
api.get('/business/file/:imageFile',BusinessController.getBusinessImageFile);

module.exports = api;