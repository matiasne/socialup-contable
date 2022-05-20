'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');
var secret = 'SocialUp';

exports.ensureAuth = function(req,res, next){
    console.log(req.headers.authorization)
    if(!req.headers.authorization){
        return res.status(403).send({message: 'La petición no tiene la cabecera  de autenticación'})
    }

    var token = req.headers.authorization;

    try{
        var payload = jwt.decode(token, secret);

        if(payload.exp <= moment.unix()){
            return res.status(401).send({message: 'El token ha expirado'});
        }
    }catch(ex){
        return res.status(404).send({message: 'Token no valido'})
    }

    req.user = payload;

    next();
};