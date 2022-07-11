'use strict'

var express = require('express');
var SaleController = require('../controllers/sale');
var md_auth = require('../middlewares/authenticated');

var api = express.Router();



api.post('/sale',SaleController.saveSale); 

module.exports = api;

