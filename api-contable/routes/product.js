'use strict' 

var express = require('express');
var ProductController = require('../controllers/product')
var md_auth = require('../middlewares/authenticated');
var md_uploadFile = require('../middlewares/upload-file')

var api = express.Router();
api.get('/product/:id', md_auth.ensureAuth, ProductController.getProduct);
api.put('/product/:_id', [ md_auth.ensureAuth, md_uploadFile.single('image')], ProductController.updateProduct);
api.delete('/product/:id', md_auth.ensureAuth, ProductController.deleteProduct);
api.post('/product' ,md_uploadFile.single('image'), ProductController.addProduct);
api.get('/product/file/:imageFile',ProductController.getProductImageFile);
api.get('/business/:idBusiness/products',md_auth.ensureAuth,ProductController.getProducts);

module.exports = api;