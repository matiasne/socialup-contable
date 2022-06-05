'use strict'

var bcrypt = require('bcrypt-nodejs');
var userRepository = require('../repositories/user');
var jwtHanlder = require('./jwtHanlder'); 
const path = require('path'); 
var imagesHandler = require('./imagesHandler');
 
function getUser(req,res){
    let userRepo = new userRepository();

    userRepo.get(req.params.id).then(user=>{
        res.status(200).send({user: user});
    }).catch(err=>{
        res.status(404).send({message: 'User does not exist'});
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
        if (req.file) {   
            let imgHandler = new imagesHandler()
            update.image = await imgHandler.processImage(req.file,'users')
        }
        
        let userRepo = new userRepository(); 
        let u = await userRepo.update(userId, update)
        res.status(200).send({user: u});
        
    }catch(error){
        console.log(error)
        res.status(400).send({message: error});
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
            let token = jwtHanlder.createToken(user);
            
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