'use strict'

var express = require('express');
var AfipController = require('../controllers/afip');
var md_auth = require('../middlewares/authenticated');
var md_uploadFile = require('../middlewares/upload-file');
var md_afip = require('../middlewares/afip');
const validationSchema = require('../middlewares/requestValidation');
const {registerAfipSchema} = require('../validationSchema/afipRegister');

var api = express.Router();

api.get('',[md_auth.ensureAuth], AfipController.prueba);
api.post('register',[md_auth.ensureAuth,validationSchema(registerAfipSchema)], AfipController.register);

api.get('consultar-padron', md_afip.startAfip, AfipController.consultarPadron);
api.get('tipos-taxes', md_afip.startAfip, AfipController.taxTypes);
api.get('option-types', md_afip.startAfip, AfipController.optionTypes);
api.get('currencies-types', md_afip.startAfip, AfipController.currenciesTypes);
api.get('aloquot-types', md_afip.startAfip, AfipController.aloquotTypes);
api.get('document-types', md_afip.startAfip, AfipController.documentTypes);
api.get('concept-types', md_afip.startAfip, AfipController.conceptTypes);
api.get('voucher-types', md_afip.startAfip, AfipController.voucherTypes);
api.get('sales-point', md_afip.startAfip, AfipController.salesPoint);
api.get('status', md_afip.startAfip, AfipController.status);
api.get('prueba', md_afip.startAfip, AfipController.prueba);

module.exports = api;