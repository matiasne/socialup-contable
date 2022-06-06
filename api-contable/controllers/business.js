'use strict'

var bcrypt = require('bcrypt-nodejs');
var businessRepository = require('../repositories/business');
var jwt = require('../middlewares/jwt');
const path = require('path');

function getBusiness(req,res){
    let businessRepo = new businessRepository();

    let business=  businessRepo.get(req.params.id).then(business=>{
        res.status(200).send({business: business});
    }).catch(err=>{
        res.status(404).send({message: 'no hay'});
    });
}

async function addBusiness(req,res){

    var params = req.body;   
console.log(params)
    let businessRepo = new businessRepository();

    let business= await businessRepo.create(params);

    res.status(200).send({business: business});
           
}

async function updateBusiness(req,res){
    let businessId = req.params._id;
    let update = req.body;

    try{
        // Guardar el usuario        
        if (req.file) {       
            let fs = require('fs')
            let oldPath = req.file.path;
            let newPath = 'public/business/'+req.file.filename; //poner directorio en una variable (env?)
            
            let ext_split = req.file.filename.split('.');
            let file_ext= ext_split[1];
            if(file_ext =='png' || file_ext == 'jpg'|| file_ext == 'gif' || file_ext =='jpeg'){
                 fs.rename(oldPath, newPath, async (err) => {
                    console.log(err)
                    if (err) {                        
                        res.status(500).send({message: err})
                    }
                    else{
                        update.image = 'http://localhost:3977/api/business/file/'+req.file.filename;
                        
                        let businessRepo = new businessRepository(); 
                        let reponse = await businessRepo.update(businessId, update)
                        res.status(200).send({business: reponse});
                    }                                 
                });
            }
            else{
                res.status(401).send({message: 'Not Allowed image extension'})
            }
        }
        else{ 
            let businessRepo = new businessRepository(); 
            let reponse = await businessRepo.update(businessId, update)
            res.status(200).send({business: reponse});
        }
    }catch(error){
        console.log(error)
       // res.status(400).send({message: error});
    }
}

async function deleteBusiness(req,res){
    var businessId = req.params.id;

    try{
        // Guardar el usuario
        let businessRepo = new businessRepository();
    
        let business= await businessRepo.delete(businessId);

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
    getBusinessImageFile
} ; 