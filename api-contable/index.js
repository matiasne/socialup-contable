'use strict'

var dotenv = require('dotenv');
var path = require('path');
var mongoose = require('mongoose');
var app = require('./app');

dotenv.config({
    path: path.resolve(__dirname, process.env.NODE_ENV + '.env')
  });

mongoose.Promise = global.Promise;

//console.log(process.env.DB_TDB+'://'+ process.env.DB_USER+':'+process.env.DB_PWD+'@'+ process.env.DB_HOST+':'+process.env.DB_PORT+'/'+process.env.DB_NAME);

mongoose.connect( process.env.DB_TDB+'://'+ process.env.DB_USER+':'+process.env.DB_PWD+'@'+ process.env.DB_HOST+':'+process.env.DB_PORT+'/'+process.env.DB_NAME, (err,res) => {
    if(err){
        throw err;
    }else{
        console.log('La base de datos esta corriendo correctamente');

        app.listen(process.env.APP_PORT, function(){
            console.log('Servidor escuchando en el puerto '+ process.env.APP_PORT);  
        });
    }
});