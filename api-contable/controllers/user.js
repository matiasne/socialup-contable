'use strict'

var bcrypt = require('bcrypt-nodejs');
//var userRepository = require('../repositories/user')
var userRepository = require('../repositories/user');
//var User = require('../models/user');
var createUserSchema = require('../validationSchema/userRegister');
const Joi = require('joi'); 

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
    var userId = req.params.id;
    var update = req.body;

    try{
        // Guardar el usuario
        let userRepo = new userRepository();
    
        let user = await userRepo.update(userId, update);

        res.status(200).send({user: user});
    }catch(error){
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
            console.log(check)
        if(check){
            res.status(200).send({user: user});   
        }else{
            res.status(400).send({message: err});
        }
        })
    }catch(error){
        res.status(400).send({message: error});
    }

    
    
//    User.findOne({email: email.toLowerCase()},(err,user) => {
//        if(err){
//            res.status(500).send({message: 'Error en la petición'});
//        }else{
//            if(!user){
//                res.status(404).send({message: 'El usuario no existe'});
//            }else{
//                // Comprobar la contraseña
//                bcrypt.compare(password, user.password, function(err,check){
//                    if(check){
//                        //Devuelve los datos del usuario logueado
//                        if(params.gethash){
                            // Devoler un token de jwt
//                            res.status(200).send({
//                                token: jwt.createToken(user)

//                            })
//                        }else{
//                            res.status(200).send({user});
//                        }

//                    }else{
//                        res.status(404).send({message: 'El usuario no pudo loguearse'});
//                    }
//                })
//            }
//        }
//    })

}

module.exports = {
    getUser, 
    saveUser,
    updateUser,
    deleteUser,
    loginUser
} ; 