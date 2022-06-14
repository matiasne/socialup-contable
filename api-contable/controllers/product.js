'use strict'

var productRepository = require('../repositories/product');
var jwtHanlder = require ('./jwtHanlder');
const path = require('path'); 
var imagesHandler = require('./imagesHandler');
const product = require('../models/product');

function getProduct(req,res){
    let productRepo = new productRepository();

    let product =  productRepo.get(req.params.id).then(product=>{
        res.status(200).send({product: product});
    }).catch(err=>{
        res.status(404).send({message: 'no hay'});
    });
}

async function getProducts(req,res){

    var idBusiness = req.params.idBusiness
    let productRepo = new productRepository();
    
try{
    let products = await productRepo.getByBusinessId(idBusiness)
    console.log(idBusiness)
        if(!products){
            res.status(404).send({message: 'no hay products'});
        }else{
            res.status(200).send({data:products});
        }
      
}catch(error){
    res.status(400).send({message: error});
}
}

async function addProduct(req,res){

    var params = req.body;   
    let productRepo = new productRepository();

    try{ 
             
        if (req.file) {   
            let imgHandler = new imagesHandler()
            params.image = await imgHandler.processImage(req.file,'product')
        }

        var tokenPayload = jwtHanlder.getDataToken(req.headers.authorization);
        params.userId = tokenPayload.sub;

        let product = await productRepo.create(params);       
console.log(product)
        res.status(200).send({product: product});

    }catch(error){
        console.log(error)
        res.status(400).send({message: error});
    }           
}

async function updateProduct(req,res){
    let productId = req.params._id;
    let update = req.body;

    try{      
        if (req.file) {   
            let imgHandler = new imagesHandler()
            update.image = await imgHandler.processImage(req.file,'product')
        }

        let productRepo = new productRepository(); 
        let reponse = await productRepo.update(productId, update)
        res.status(200).send({product: reponse});
        
    }catch(error){
        console.log(error)
        res.status(400).send({message: error});
    }
}

async function deleteProduct(req,res){
    var productId = req.params.id;

    try{
        // Guardar el usuario
        let productRepo = new productRepository();
    
        let product = await productRepo.delete(productId);

        res.status(200).send({product: product});
    }catch(error){
        res.status(400).send({message: error});
    }
}


function getProductImageFile(req,res){
    var fs = require('fs')
    var imageFile = req.params.imageFile;
    var path_file='public/product/'+imageFile

    fs.exists(path_file, (exists) => {
       if(exists){
            res.sendFile(path.resolve(path_file));        
        }else{
            res.status(200).send({message: 'No existe la imagen...'});
        }
    })
}

module.exports = {
    addProduct,
    getProduct,
    deleteProduct,
    updateProduct,
    getProductImageFile,
    getProducts
} ; 