'use strict'

const Afip = require('@afipsdk/afip.js');

exports.startAfip = function(req,res, next){   

    /*acá hay que validar el token de afip para que no cualquiera pueda hacerlo*/
    /*se obtiene desde un usuario y contraseña que solo se guarda localmente*/
    /*este usuario y contraseña lo generamos al cargar los archivos key y pem*/

    if (!fs.existsSync(process.env.FOLDER_AFIP+'/'+req.comercioId+'_'+req.ptoVenta+'.key')) {
        //archivo key no existe
    }   
    
    if (!fs.existsSync(process.env.FOLDER_AFIP+'/'+req.comercioId+'_'+req.ptoVenta+'.pem')) {
        //archivo pem no existe
    }  
    
    try{
        const afip = new Afip({ 
          CUIT: req.nroDoc, 
          cert: req.comercioId+req.ptoVenta+".pem",
          key: req.comercioId+req.ptoVenta+".key", 
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