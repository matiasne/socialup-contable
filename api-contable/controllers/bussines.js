'use strict'


var bussinesRepository = require('../repositories/bussines');
var jwtHanlder = require ('./jwtHanlder');
const path = require('path'); 
var imagesHandler = require('./imagesHandler');

function getBussines(req,res){
    let bussinesRepo = new bussinesRepository();

    let bussines =  bussinesRepo.get(req.params.id).then(bussines=>{
        res.status(200).send({bussines: bussines});
    }).catch(err=>{
        res.status(404).send({message: 'no hay'});
    });
}

async function addBussines(req,res){

    var params = req.body;   
    let bussinesRepo = new bussinesRepository();

    try{ 
             
        if (req.file) {   
            let imgHandler = new imagesHandler()
            params.image = await imgHandler.processImage(req.file,'users')
        }

        var tokenPayload = jwtHanlder.getDataToken(req.headers.authorization);
        params.userId = tokenPayload.sub;

        let bussines = await bussinesRepo.create(params);       

        res.status(200).send({bussines: bussines});

    }catch(error){
        console.log(error)
        res.status(400).send({message: error});
    }           
}

async function updateBussines(req,res){
    let bussinesId = req.params._id;
    let update = req.body;

    try{      
        if (req.file) {   
            let imgHandler = new imagesHandler()
            update.image = await imgHandler.processImage(req.file,'users')
        }

        let bussinesRepo = new bussinesRepository(); 
        let reponse = await bussinesRepo.update(bussinesId, update)
        res.status(200).send({bussines: reponse});
        
    }catch(error){
        console.log(error)
        res.status(400).send({message: error});
    }
}

async function deleteBussines(req,res){
    var bussinesId = req.params.id;

    try{
        // Guardar el usuario
        let bussinesRepo = new bussinesRepository();
    
        let bussines = await bussinesRepo.delete(bussinesId);

        res.status(200).send({bussines: bussines});
    }catch(error){
        res.status(400).send({message: error});
    }
}


function getBussinesImageFile(req,res){
    var fs = require('fs')
    var imageFile = req.params.imageFile;
    var path_file='public/bussines/'+imageFile

    fs.exists(path_file, (exists) => {
       if(exists){
            res.sendFile(path.resolve(path_file));        
        }else{
            res.status(200).send({message: 'No existe la imagen...'});
        }
    })
}

module.exports = {
    addBussines,
    getBussines,
    deleteBussines,
    updateBussines,
    getBussinesImageFile
} ; 