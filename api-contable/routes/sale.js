'use strict'

const express = require('express');
const SaleController = require('../controllers/sale');
const md_auth = require('../middlewares/authenticated');
const { saveSaleSchema } = require("../validationSchema/sale.schema");
const validationSchema = require("../middlewares/requestValidation");

var api = express.Router();
//api.post('/sale', validationSchema(saveSaleSchema), SaleController.saveSale); 
api.post('/sale', SaleController.saveSale);
api.get('/business/:idBusiness/sales', md_auth.ensureAuth, SaleController.getSales);
api.get('/sale/:_id', md_auth.ensureAuth, SaleController.getSale);

module.exports = api;
