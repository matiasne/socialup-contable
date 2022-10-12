'use strict'

var express = require('express');
var SaleController = require('../controllers/sale');
var md_auth = require('../middlewares/authenticated');

var api = express.Router();
api.post('/sale',SaleController.saveSale); 
//api.get('/business/:idBusiness/sales',md_auth.ensureAuth,SaleController.getSales);
api.get('/business/:idBusiness/sales',SaleController.getSales);

module.exports = api;

