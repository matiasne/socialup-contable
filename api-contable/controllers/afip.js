'use strict'

import { AfipVoucher, CbteAsoc, EnumAfipConceptos, EnumAfipMoneda, EnumAfipPersonaJuridica, EnumAfipTiposComprobantes, EnumAfipTiposDocumentos, IvaItem } from "../models/afipVoucher";
let os = require('os')
const Afip = require('@afipsdk/afip.js');
const fs = require('fs');

var afipRepository = require('../repositories/afip');



function register(req,res){  
    
}





function voucherInfo(req,res){
   //req.body.nroComprobante = 1
   // req.body.ptoVenta = 1
   // req.body.tipoComprobante = 6
   try{
      const voucherInfo = await req.afip.ElectronicBilling.getVoucherInfo(
        req.body.nroComprobante,
        req.body.ptoVenta,
        req.body.tipoComprobante
      ); 

      if(voucherInfo === null){
          console.log('El comprobante no existe');
          return res.status(400).send('El comprobante no existe');
      }
      else{
          console.log('Esta es la información del comprobante:');
          console.log(voucherInfo);
          return res.status(200).send({data:voucherInfo});
      }  
   }catch(err){
      return res.status(500).send({data:err}); 
   }
       	
        
}

function getLastVoucherNumber(req,res){     
  
  try{
    const voucherInfo = await req.afip.ElectronicBilling.getLastVoucher(1,6); //Devuelve la información del comprobante 1 para el punto de venta 1 y el tipo de comprobante 6 (Factura B)
  
    if(voucherInfo === null){
      console.log('El comprobante no existe');
      return res.status(400).send('El comprobante no existe');
    }
    else{
      console.log('Esta es la información del comprobante:');
      console.log(voucherInfo);
      return res.status(200).send({voucher:voucherInfo});
    }  
  }catch(err){
    return res.status(500).send({data:err}); 
  } 
        
}

function getLastVoucherInfo(req,res){    

  try{
    const numero = await req.afip.ElectronicBilling.getLastVoucher(1,6); //Devuelve la información del comprobante 1 para el punto de venta 1 y el tipo de comprobante 6 (Factura B)
    const voucherInfo = await req.afip.ElectronicBilling.getVoucherInfo(numero,1,6); //Devuelve la información del comprobante 1 para el punto de venta 1 y el tipo de comprobante 6 (Factura B)
    
    if(voucherInfo === null){
        console.log('El comprobante no existe');
        return res.status(400).send('El comprobante no existe');
    }
    else{
        console.log('Esta es la información del comprobante:');
        console.log(voucherInfo);
        return res.status(200).send({voucher:voucherInfo});
    }     
  }catch(err){
    return res.status(500).send({data:err}); 
  } 
      
   
}

function createVoucher(req,res){
    
  try{
    //Aca debo obtener el último número de voucher getLastVoucher
    const lastVoucherNumber = await req.afip.ElectronicBilling.getLastVoucher(1,6); //Devuelve la información del ultimo voucher
        
    let voucher = new AfipVoucher();
    voucher.CantReg ="1";
    voucher.PtoVta = req.body.PtoVta; // Punto de venta
    voucher.CbteTipo = req.body.CbteTipo; //6,  // Tipo de comprobante (ver tipos disponibles) 
    voucher.Concepto = req.body.Concepto;//1,  // Concepto del Comprobante: (1)Productos, (2)Servicios, (3)Productos y Servicios
    voucher.DocTipo = req.body.DocTipo;//99, // Tipo de documento del comprador (99 consumidor final, ver tipos disponibles)
    voucher.DocNro = req.body.DocNro;//0,  // Número de documento del comprador (0 consumidor final)
    voucher.CbteDesde = lastVoucherNumber +1;// Número de comprobante o numero del primer comprobante en caso de ser mas de uno
    voucher.CbteHasta = lastVoucherNumber +1;// Número de comprobante o numero del último comprobante en caso de ser mas de uno
    voucher.CbteFch = parseInt(req.body.CbteFch.replace(/-/g, ''));//parseInt(date.replace(/-/g, '')), // (Opcional) Fecha del comprobante (yyyymmdd) o fecha actual si es nulo
    voucher.ImpTotal = req.body.ImpTotal;//121, // Importe total del comprobante
    voucher.ImpTotConc = req.body.ImpTotConc;//0,   // Importe neto no gravado
    voucher.ImpNeto = req.body.ImpNeto; //100, // Importe neto gravado
    voucher.ImpOpEx = req.body.ImpOpEx;//0,   // Importe exento de IVA
    voucher.ImpIVA = req.body.ImpIVA;//21,  //Importe total de IVA
    voucher.ImpTrib = req.body.ImpTrib;//0,   //Importe total de tributos
    voucher.MonId = req.body.MonId;//'PES', //Tipo de moneda usada en el comprobante (ver tipos disponibles)('PES' para pesos argentinos) 
    voucher.MonCotiz = req.body.MonCotiz;//1,     // Cotización de la moneda usada (1 para pesos argentinos)            

    if(req.body.iva.length > 0){
        req.body.iva.forEach((i) => {
            let iva = new IvaItem()
            iva.asignarValores(i)
            voucher.Iva.push(iva)
        });                    
    }              

    const respuesta = await req.afip.ElectronicBilling.createVoucher(voucher);    
    return res.status(200).send({CAE:respuesta['CAE'],CAEFchVto:respuesta['CAEFchVto']});
  }catch(err){
    console.log(err)
    res.status(500).send({message:err});
  }     
             
      
    //CAE asignado el comprobante
    //Fecha de vencimiento del CAE (yyyy-mm-dd)
}   


function prueba(req,res){
  res.status(200).send("Prueba Ok!")
}

function status(req,res){    
  try{         
      let serverStatus = await req.afip.ElectronicBilling.getServerStatus();
      return res.status(200).send({data:serverStatus});    
  }   
  catch(err){
      console.log(err)
      return res.status(500).send({data:err}); 
  }             
}

function salesPoint(req,res){  
  try{ 
    const salesPoints= await req.afip.ElectronicBilling.getSalesPoints();
    return res.status(200).send({data:salesPoints});	
  }   
  catch(err){
      console.log(err)
      return res.status(500).send({data:err}); 
  }   
}

function voucherTypes(req,res){
  try{
    const voucherTypes = await req.afip.ElectronicBilling.getVoucherTypes();
    return res.status(200).send({data:voucherTypes});
  }   
  catch(err){
      console.log(err)
      return res.status(500).send({data:err}); 
  }   	               
}

function conceptTypes(req,res){
  try{
    const conceptTypes = await req.afip.ElectronicBilling.getConceptTypes();
    return res.status(200).send({data:conceptTypes});   
  }   
  catch(err){
      console.log(err)
      return res.status(500).send({data:err}); 
  }  
}

function documentTypes(req,res){
  try{
    const documentTypes  = await req.afip.ElectronicBilling.getDocumentTypes();
    return res.status(200).send({data:documentTypes }); 	 
  }   
  catch(err){
      console.log(err)
      return res.status(500).send({data:err}); 
  }               
}

function aloquotTypes(req,res){  
  try{
    const aloquotTypes  = await req.afip.ElectronicBilling.getAliquotTypes();
    return res.status(200).send({data :aloquotTypes  }); 
  }   
  catch(err){
      console.log(err)
      return res.status(500).send({data:err}); 
  }    	     
}

function currenciesTypes(req,res){  
  try{
    const currenciesTypes = await req.afip.ElectronicBilling.getCurrenciesTypes();
    return res.status(200).send({data :currenciesTypes  });   
  }   
  catch(err){
      console.log(err)
      return res.status(500).send({data:err}); 
  }     
}

function optionTypes(req,res){  
  try{
    const optionTypes  = await req.afip.ElectronicBilling.getOptionsTypes();
    return res.status(200).send({data  :optionTypes   });  
  }   
  catch(err){
      console.log(err)
      return res.status(500).send({data:err}); 
  }           
}

function taxTypes(req,res){  
  try{
    const taxTypes = await req.afip.ElectronicBilling.getTaxTypes();
    return res.status(200).send({data :taxTypes});    
  }   
  catch(err){
      console.log(err)
      return res.status(500).send({data:err}); 
  }         
}

function consultarPadron(req,res){  
  try{
    const taxpayerDetails = await req.afip.RegisterScopeThirteen.getTaxpayerDetails(req.body.cuit);
    return res.status(200).send({data :taxpayerDetails});  
  }   
  catch(err){
      console.log(err)
      return res.status(500).send({data:err}); 
  }            
}    

module.exports = {
  consultarPadron,
  taxTypes,
  optionTypes,
  currenciesTypes,
  aloquotTypes,
  documentTypes,
  conceptTypes,
  voucherTypes,
  salesPoint,
  status,
  prueba,
  voucherInfo,
  getLastVoucherNumber,
  getLastVoucherInfo,
  createVoucher
}; 

