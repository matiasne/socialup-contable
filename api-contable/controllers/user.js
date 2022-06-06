'use strict'

var bcrypt = require('bcrypt-nodejs');
var userRepository = require('../repositories/user');
var createUserSchema = require('../validationSchema/userRegister');
const Joi = require('joi'); 
var jwt = require('../middlewares/jwt');
const path = require('path');

function getUser(req,res){
    let userRepo = new userRepository();

    let user =  userRepo.get(req.params.id).then(user=>{
        res.status(200).send({user: user});
    }).catch(err=>{
        res.status(404).send({message: 'no hay'});
    });
}

async function saveUser(req,res){
    var params = req.body;   

    bcrypt.hash(params.password, null, null, async function(err,hash){
        try{
            if(err){
               
                res.status(400).send({message: err});    
            }else{
                params.password = hash;
                
                let userRepo = new userRepository();
    
                let user = await userRepo.create(params);
                
                res.status(200).send({user: user});
            }
        }catch(error){
           
            res.status(400).send({message: error});
        }
    });
}

async function updateUser(req,res){
    let userId = req.params._id;
    let update = req.body;

    try{
        // Guardar el usuario        
        if (req.file) {       
            let fs = require('fs')
            let oldPath = req.file.path;
            let newPath = 'public/users/'+req.file.filename; //poner directorio en una variable (env?)
            
            let ext_split = req.file.filename.split('.');
            let file_ext= ext_split[1];
            if(file_ext =='png' || file_ext == 'jpg'|| file_ext == 'gif' || file_ext =='jpeg'){
                 fs.rename(oldPath, newPath, async (err) => {
                    console.log(err)
                    if (err) {                        
                        res.status(500).send({message: err})
                    }
                    else{
                        update.image = 'http://localhost:3977/api/user/file/'+req.file.filename;
                        
                        let userRepo = new userRepository(); 
                        let u = await userRepo.update(userId, update)
                        res.status(200).send({user: u});
                    }                                 
                });
            }
            else{
                res.status(401).send({message: 'Not Allowed image extension'})
            }
        }
        else{ 
            let userRepo = new userRepository(); 
            let u = await userRepo.update(userId, update)
            res.status(200).send({user: u});
        }
        
        
        
        
       

    }catch(error){
        console.log(error)
       // res.status(400).send({message: error});
    }
}

async function deleteUser(req,res){
    var userId = req.params.id;

    try{
        // Guardar el usuario
        let userRepo = new userRepository();
    
        let user = await userRepo.delete(userId);

        res.status(200).send({user: user});
    }catch(error){
        res.status(400).send({message: error});
    }
}

async function loginUser(req,res){
    var params = req.body;

    var email = params.email;
    var password = params.password;
    

    try{
        let userRepo = new userRepository();        
        let user = await userRepo.getUserEmail(email);
        bcrypt.compare(password, user.password, function(err,check){
            
        if(check){
            let token = jwt.createToken(user);
            
            res.status(200).send({user: user, token: token});   
        }else{
            console.log(err)
            res.status(400).send({message: err});
        }
        })
    }catch(error){
        res.status(400).send({message: error});
    }
}


function getUserImageFile(req,res){
    var fs = require('fs')
    var imageFile = req.params.imageFile;
    var path_file='public/users/'+imageFile

    fs.exists(path_file, (exists) => {
       if(exists){
            res.sendFile(path.resolve(path_file));        
        }else{
            res.status(200).send({message: 'No existe la imagen...'});
        }
    })
}

function getUserBusinesses(req,res){
    res.status(200).send({message: 'Retornando array de business'});
}

module.exports = {
    getUser, 
    saveUser,
    updateUser,
    deleteUser,
    loginUser,
    getUserImageFile,
    getUserBusinesses
} ; 