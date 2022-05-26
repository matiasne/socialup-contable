'use strict'

var express = require('express');
var AfipController = require('../controllers/afip');
var md_auth = require('../middlewares/authenticated');
var md_uploadFile = require('../middlewares/upload-file');
const validationSchema = require('../middlewares/requestValidation');
const {registerAfipSchema} = require('../validationSchema/afipRegister');

var api = express.Router();

api.get('/afip',[md_auth.ensureAuth], AfipController.prueba);
api.post('/afip/register',[md_auth.ensureAuth,validationSchema(registerAfipSchema)], AfipController.register);

module.exports = api;