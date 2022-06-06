'use strict'


var businessRepository = require('../repositories/business');
var jwtHanlder = require ('./jwtHanlder');
const path = require('path'); 
var imagesHandler = require('./imagesHandler');

function getBusiness(req,res){
    let businessRepo = new businessRepository();

    let business =  businessRepo.get(req.params.id).then(business=>{
        res.status(200).send({business: business});
    }).catch(err=>{
        res.status(404).send({message: 'no hay'});
    });
}

async function getBusinesses(req,res){
   
    var idUser = req.params.idUser
    let businessRepo = new businessRepository();
    
try{
    let businesses = await businessRepo.getByUserId(idUser)
        if(!businesses){
            res.status(404).send({message: 'no hay business'});
        }else{
            res.status(200).send({businesses:businesses});
        }
      
}catch(error){
    res.status(400).send({message: error});
}
}

async function addBusiness(req,res){

    var params = req.body;   
    let businessRepo = new businessRepository();

    try{ 
             
        if (req.file) {   
            let imgHandler = new imagesHandler()
            params.image = await imgHandler.processImage(req.file,'business')
        }

        var tokenPayload = jwtHanlder.getDataToken(req.headers.authorization);
        params.userId = tokenPayload.sub;

        let business = await businessRepo.create(params);       

        res.status(200).send({business: business});

    }catch(error){
        console.log(error)
        res.status(400).send({message: error});
    }           
}

async function updateBusiness(req,res){
    let businessId = req.params._id;
    let update = req.body;

    try{      
        if (req.file) {   
            let imgHandler = new imagesHandler()
            update.image = await imgHandler.processImage(req.file,'business')
        }

        let businessRepo = new businessRepository(); 
        let reponse = await businessRepo.update(businessId, update)
        res.status(200).send({business: reponse});
        
    }catch(error){
        console.log(error)
        res.status(400).send({message: error});
    }
}

async function deleteBusiness(req,res){
    var businessId = req.params.id;

    try{
        // Guardar el usuario
        let businessRepo = new businessRepository();
    
        let business = await businessRepo.delete(businessId);

        res.status(200).send({business: business});
    }catch(error){
        res.status(400).send({message: error});
    }
}


function getBusinessImageFile(req,res){
    var fs = require('fs')
    var imageFile = req.params.imageFile;
    var path_file='public/business/'+imageFile

    fs.exists(path_file, (exists) => {
       if(exists){
            res.sendFile(path.resolve(path_file));        
        }else{
            res.status(200).send({message: 'No existe la imagen...'});
        }
    })
}

module.exports = {
    addBusiness,
    getBusiness,
    deleteBusiness,
    updateBusiness,
    getBusinessImageFile,
    getBusinesses
} ; 