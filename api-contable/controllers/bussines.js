'use strict'

var bcrypt = require('bcrypt-nodejs');
var bussinesRepository = require('../repositories/bussines');
var jwt = require('../middlewares/jwt');
const path = require('path');

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
console.log(params)
    let bussinesRepo = new bussinesRepository();

    let bussines = await bussinesRepo.create(params);

    res.status(200).send({bussines: bussines});
           
}

async function updateBussines(req,res){
    let bussinesId = req.params._id;
    let update = req.body;

    try{
        // Guardar el usuario        
        if (req.file) {       
            let fs = require('fs')
            let oldPath = req.file.path;
            let newPath = 'public/bussines/'+req.file.filename; //poner directorio en una variable (env?)
            
            let ext_split = req.file.filename.split('.');
            let file_ext= ext_split[1];
            if(file_ext =='png' || file_ext == 'jpg'|| file_ext == 'gif' || file_ext =='jpeg'){
                 fs.rename(oldPath, newPath, async (err) => {
                    console.log(err)
                    if (err) {                        
                        res.status(500).send({message: err})
                    }
                    else{
                        update.image = 'http://localhost:3977/api/bussines/file/'+req.file.filename;
                        
                        let bussinesRepo = new bussinesRepository(); 
                        let reponse = await bussinesRepo.update(bussinesId, update)
                        res.status(200).send({bussines: reponse});
                    }                                 
                });
            }
            else{
                res.status(401).send({message: 'Not Allowed image extension'})
            }
        }
        else{ 
            let bussinesRepo = new bussinesRepository(); 
            let reponse = await bussinesRepo.update(bussinesId, update)
            res.status(200).send({bussines: reponse});
        }
    }catch(error){
        console.log(error)
       // res.status(400).send({message: error});
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