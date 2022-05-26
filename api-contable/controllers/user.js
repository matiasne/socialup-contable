'use strict'

var bcrypt = require('bcrypt-nodejs');
//var userRepository = require('../repositories/user')
var userRepository = require('../repositories/user');
//var User = require('../models/user');
var createUserSchema = require('../validationSchema/userRegister');
const Joi = require('joi'); 
var jwt = require('../middlewares/jwt');

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
    var userId = req.params._id;
    var update = req.body;
    try{
        // Guardar el usuario
        let userRepo = new userRepository();
    
        let u = await userRepo.update(userId, update)

        res.status(200).send({user: u});
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
async function uploadImage(req, res){ 
    /*var userId= req.params._id;
    var file_name = 'No subido...';*/

    const file = req.file
    
    if (!file) {
        res.status(402).send({message: 'Please upload a file'});
    }
    res.status(200).send({data: file});
    /*console.log(req.f)
    if(req.files){
        console.log(req.params.image)
        var file_path = req.files.image.path;
        
        var file_split = file_path.split('\\');
        var file_name= file_split[2];
        

        var ext_split = file_name.split('\.');
        var file_ext= ext_split[1];
        console.log(file_ext)
        if(file_ext =='png' || file_ext == 'jpg'|| file_ext == 'gif' || file_ext =='jpeg'){
            User.findByIdAndUpdate(userId,{image:file_name},(err,userUpdate)=>{
               
                if(!userUpdate){
                    res.status(404).send({message: 'No se ha podido actualizar el usuario'});
                }else{
                    console.log(userUpdate);
                    res.status(200).send({image: file_name,user: userUpdate});
                }
            });
        }else{
                res.status(200).send({message: 'Extension....'});
        }

    }else{
        res.status(200).send({message: 'No se ha subido ninguna imagen '});
    }*/
}

function getImageFile(req,res){
    var imageFile = req.params.imageFile;
    var path_file='./uploads/'+imageFile;

    fs.exists(path_file, function (exists){
        if(exists){
            res.sendFile(path.resolve(path_file));
         
        }else{
            res.status(200).send({message: 'No existe la imagen...'});
        }
    })
}

module.exports = {
    getUser, 
    saveUser,
    updateUser,
    deleteUser,
    loginUser,
    uploadImage,
    getImageFile
} ; 