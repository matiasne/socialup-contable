'use strict'

const Afip = require('@afipsdk/afip.js');

exports.startAfip = function(req,res, next){
   
    if (!fs.existsSync(process.env.FOLDER_AFIP+'/'+comercioId+'_'+ptoVenta+'.key')) {
        //archivo key no existe
    }   
    
    if (fs.existsSync(process.env.FOLDER_AFIP+'/'+comercioId+'_'+ptoVenta+'.pem')) {
        //archivo pem no existe
    }  
    
    try{
        const afip = new Afip({ 
          CUIT: req.user.nroDoc, 
          cert: req.user.comercioId+req.user.ptoVenta+".pem",
          key: req.user.comercioId+req.user.ptoVenta+".key", 
          res_folder: process.env.FOLDER_AFIP,
          ta_folder:process.env.FOLDER_AFIP 
        });
        req.afip = afip;
    }
    catch(err){
        console.log(err)
    }    

    next();
};