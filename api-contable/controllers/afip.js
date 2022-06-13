'use strict'

import { AfipVoucher, CbteAsoc, EnumAfipConceptos, EnumAfipMoneda, EnumAfipPersonaJuridica, EnumAfipTiposComprobantes, EnumAfipTiposDocumentos, IvaItem } from "../models/afipVoucher";
let os = require('os')
const Afip = require('@afipsdk/afip.js');
const fs = require('fs');

var afipRepository = require('../repositories/afip');



function register(req,res){  
    let params = req.body; 
    let afipRepo = new afipRepository();    
    let afip = await afipRepo.create(params);    
    res.status(200).send({data: afip});
}





function voucherInfo(req,res){
   //req.body.nroComprobante = 1
   // req.body.ptoVenta = 1
   // req.body.tipoComprobante = 6
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
        
}

function getLastVoucherNumber(req,res){     
  
    
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
        
}

function getLastVoucherInfo(req,res){    

  
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
   
}

function createVoucher(req,res){
    
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
      
    //CAE asignado el comprobante
    //Fecha de vencimiento del CAE (yyyy-mm-dd)
}   

function createFacturaFromPedido(req,res){
  try{
    console.log(req.user.comercioId+" "+req.body.pedidoId+" "+req.user.ptoVenta)
    let pedidoRef =  db.collection('comercios/'+req.user.comercioId+'/pedidos').doc(req.body.pedidoId)
    pedidoRef.get().then((doc)=>{
      if(doc.exists){

        let pedido = doc.data();
        pedido.id = doc.id;

        let voucherTipo = EnumAfipTiposComprobantes.facturaC;
        let CbteLetra = "C";

        if(req.user.personaJuridica == EnumAfipPersonaJuridica.responsableInscripto){
          if(pedido.clientePersonaJuridica == EnumAfipPersonaJuridica.responsableInscripto){
            voucherTipo = EnumAfipTiposComprobantes.facturaA;
            CbteLetra = "A";
          }

          if(pedido.clientePersonaJuridica != EnumAfipPersonaJuridica.responsableInscripto){
            voucherTipo = EnumAfipTiposComprobantes.facturaB;
            CbteLetra = "B"
          }
        }

            
        let puntoDeVenta = req.user.ptoVenta;      
        const voucherDate = parseInt(req.body.CbteFch.replace(/-/g, ''))   
        
                          
        const voucher = await this.createVoucherFromPedido(afip,pedido,voucherDate,voucherTipo,puntoDeVenta)
           
        try{
          const respuesta = await req.afip.ElectronicBilling.createVoucher(voucher);  
          
          let fechaEmision = new Date()
          let datos = {
            afipFactura:{
              emisor:{
                razonSocial:req.user.razonSocial,
                tipoDoc:req.user.tipoDoc,
                nroDoc:req.user.nroDoc,
                personaJuridica:req.user.personaJuridica,
                ptoVenta:req.user.ptoVenta,
                fechaInicioActividades:req.user.fechaInicioActividades,
                ingresosBrutos:req.user.ingresosBrutos,
              },       
              receptor:{
                nombre:pedido.clienteNombre,
                tipoDoc:pedido.clienteDocTipo,
                numDuc:pedido.clienteDoc,
                direccion:pedido.clienteDireccion,
                personaJuridica:pedido.clientePersonaJuridica
              },                  
              CbteLetra:CbteLetra,
              CbteTipo:voucherTipo,
              CAE:respuesta['CAE'],
              CAEFchVto:respuesta['CAEFchVto'],
              voucherNumber:voucher.CbteHasta,
              fechaEmision:fechaEmision
            }
          }
          
          var writeOperation = await pedidoRef.set(datos,{merge:true}) //lo seteamos desde el back para asegurarnos que se guarden los datos
          console.log(writeOperation)

          
          return res.status(200).send(datos);

          
        }
        catch(err){
          console.log("err")
          console.log(err)
          
          return res.status(500).send({message:err.message});
        }  

      }
      else{
        
        res.status(200).send({message:"Pedido no existe"});
      }
    }).catch((err)=>{
      res.status(500).send(err);
      console.log(err)
      
    })
  }
  catch(err){
    console.log(err)
    res.status(500).send({message:err});
  }     
  
}

function createNotaCreditoFromPedido(req,res){
  try{
    console.log(req.user.comercioId+" "+req.body.pedidoId+" "+req.user.ptoVenta)
    let pedidoRef =  db.collection('comercios/'+req.user.comercioId+'/pedidos').doc(req.body.pedidoId)
    pedidoRef.get().then((doc)=>{
      if(doc.exists){

        let pedido = doc.data();
        pedido.id = doc.id;

        let voucherTipo = EnumAfipTiposComprobantes.notaCreditoC;

        if(doc.data().afipFactura.voucherTipo == EnumAfipTiposComprobantes.facturaB){
          voucherTipo = EnumAfipTiposComprobantes.notaCreditoB;
        }

        if(doc.data().afipFactura.voucherTipo == EnumAfipTiposComprobantes.facturaA){
          voucherTipo = EnumAfipTiposComprobantes.notaCreditoA;
        }
        
            
        let puntoDeVenta = req.user.ptoVenta;      
        const voucherDate = parseInt(req.body.CbteFch.replace(/-/g, ''))          
                            
        const voucher = await this.createVoucherFromPedido(afip,pedido,voucherDate,voucherTipo,puntoDeVenta,req.body.montoReembolso,null,null,null)
                             
        try{
          const respuesta = await req.afip.ElectronicBilling.createVoucher(voucher);  
          console.log("respuesta")
          console.log(respuesta)
          
          let datos = {afipNotaCredito:{CbteTipo:voucherTipo,CAE:respuesta['CAE'],CAEFchVto:respuesta['CAEFchVto']}}
          
          var writeOperation = await pedidoRef.set(datos,{merge:true})
          console.log(writeOperation)

         
          return res.status(200).send(datos);

          
        }
        catch(err){
          console.log("err")
          console.log(err)
          
          return res.status(500).send({message:err.message});
        }

        

      }
      else{
        
        res.status(200).send({message:"Pedido no existe"});
      }
    }).catch((err)=>{
      res.status(500).send(err);
      console.log(err)
      
    })
  }
  catch(err){
    console.log(err)
    res.status(500).send({message:err});
  }       
}


  

function createVoucherFromPedido(afip,pedido,voucherDate,voucherTipo,puntoDeVenta,montoReembolso=0,FchServDesde = null,FchServHasta=null,FchVtoPago=null){
  let voucher = new AfipVoucher();    
  
  const lastVoucherNumber = await req.afip.ElectronicBilling.getLastVoucher(puntoDeVenta,voucherTipo); //Devuelve la información del ultimo voucher
  const voucherNumber = Number(lastVoucherNumber) +1;

  voucher.CantReg = "1";
  voucher.PtoVta = puntoDeVenta; // Punto de venta          
  voucher.CbteTipo = voucherTipo; //6,  // Tipo de comprobante (ver tipos disponibles) A B o C depende del tipo de persona juridica (viene del frontend)

  let concepto = EnumAfipConceptos.productos;
  let impNeto= "0";
  let impOpEx = "0";
  let impIVA = "0";
  let impTotal = "0"
  
  console.log("voucherTipo "+voucherTipo)
  console.log("total "+pedido.total)

  if(voucherTipo == EnumAfipTiposComprobantes.facturaC){ //Si  es factura C no debe cargar datos de iva
    impNeto = pedido.total
    impTotal = pedido.total
    impIVA = "0"
    delete voucher.Iva
  }

  //Debe discrimar IVA
  if(voucherTipo == EnumAfipTiposComprobantes.facturaA || voucherTipo == EnumAfipTiposComprobantes.facturaB){  //Saco calculos del Iva para facturas tipo A

    let impuesto = 0;

    if(pedido.items.length > 0){           
      pedido.items.forEach((item) => {
        impuesto = item.impuestoPorcentaje;
        console.log(item.nombre)
        impNeto += (Number(item.precioTotal) / (1+Number(item.impuestoPorcentaje))).toFixed(2)
        impIVA += (Number(impNeto) * Number(item.impuestoPorcentaje)).toFixed(2)
      });
    }
  

    if(pedido.recargos.length > 0){           
      pedido.recargos.forEach((item) => {
        console.log(item.nombre)
        impNeto += (Number(item.monto) / (1+Number(impuesto))).toFixed(2)
        impIVA += (Number(impNeto) * Number(impuesto)).toFixed(2)
      });
    }

    //No recuerdo si el descuento se factura
  /*  if(pedido.descuentos.length > 0){           
      pedido.descuentos.forEach((item) => {
        console.log(item.nombre)
        impNeto += (Number(item.monto) / (1+Number(impuesto))).toFixed(2)
        impIVA += (Number(impNeto) * Number(impuesto)).toFixed(2)
      });
    }*/
    
  
    impTotal = (Number(impNeto) + Number(impIVA)).toFixed(2);
    voucher.Iva=[]
    let iva = new IvaItem()
    iva.Id= "5";
    iva.BaseImp = impNeto;
    iva.Importe = impIVA;
    voucher.Iva.push(iva)

  }

  if(voucherTipo == EnumAfipTiposComprobantes.notaCreditoA || voucherTipo == EnumAfipTiposComprobantes.notaCreditoB || voucherTipo == EnumAfipTiposComprobantes.notaCreditoC){
    voucher.ImpTotal = montoReembolso.toString()
    voucher.CbtesAsoc = [];
    let voucherAsociado = new CbteAsoc();
    voucherAsociado.Tipo = pedido.afipFactura.CbteTipo;
    voucherAsociado.PtoVta = puntoDeVenta;
    voucherAsociado.Nro = pedido.afipFactura.voucherNumber;
    voucher.CbtesAsoc.push(voucherAsociado)
  }

  let tieneProd = false;
  let tieneServ = false;

  pedido.items.forEach((element) => {
    if(element.tipo == 1){
      tieneProd = true;
    }
    if(element.tipo == 2){
      tieneServ = true
    }
  });

  if(tieneProd){
    concepto = EnumAfipConceptos.productos;
  }

  if(tieneServ){
    concepto = EnumAfipConceptos.servicios;
    voucher.FchServDesde 	= FchServDesde; // (Opcional) Fecha de inicio del servicio (yyyymmdd), obligatorio para Concepto 2 y 3
    voucher.FchServHasta= FchServHasta; // (Opcional) Fecha de fin del servicio (yyyymmdd), obligatorio para Concepto 2 y 3
    voucher.FchVtoPago= FchVtoPago; // (Opcional) Fecha de vencimiento del servicio (yyyymmdd), obligatorio para Concepto 2 y 3
  }
  
 
  if(tieneProd && tieneServ){
    concepto =  EnumAfipConceptos.productosServicios;
  }
                

  let tipoDoc = EnumAfipTiposDocumentos.consumidorFinal;      
  
  if(pedido.clienteDoc != ""){
    if(pedido.clienteDocTipo=="CUIT"){
      tipoDoc = EnumAfipTiposDocumentos.cuit
    }

    if(pedido.clienteDocTipo=="CUIL"){
      tipoDoc = EnumAfipTiposDocumentos.cuil
    }

    if(pedido.clienteDocTipo=="DNI"){
      tipoDoc = EnumAfipTiposDocumentos.dni
    }
  }
  else{
    pedido.clienteDoc = "0";
  }
  

  voucher.Concepto = concepto;//1,  // Concepto del Comprobante: (1)Productos, (2)Servicios, (3)Productos y Servicios
  voucher.DocNro = pedido.clienteDoc;//0,  // Número de documento del comprador (0 consumidor final)
  voucher.DocTipo = tipoDoc;//99, // Tipo de documento del comprador (99 consumidor final, ver tipos disponibles)
  voucher.CbteDesde = voucherNumber;// Número de comprobante o numero del primer comprobante en caso de ser mas de uno
  voucher.CbteHasta = voucherNumber;// Número de comprobante o numero del último comprobante en caso de ser mas de uno
  voucher.CbteFch = voucherDate;//parseInt(date.replace(/-/g, '')), // (Opcional) Fecha del comprobante (yyyymmdd) o fecha actual si es nulo
            
  voucher.ImpTotal = impTotal;//121, // Importe total del comprobante
  voucher.ImpTotConc = "0";//0,   // Importe neto no gravado
  
  voucher.ImpNeto = impNeto; //100, // Importe neto gravado
  voucher.ImpOpEx = impOpEx;//0,   // Importe exento de IVA
  voucher.ImpIVA = impIVA;//21,  //Importe total de IVA
  voucher.ImpTrib = "0";//0,   //Importe total de tributos
  voucher.MonId = EnumAfipMoneda.pesos;//'PES', //Tipo de moneda usada en el comprobante (ver tipos disponibles)('PES' para pesos argentinos) 
  voucher.MonCotiz = "1";//1,     // Cotización de la moneda usada (1 para pesos argentinos)            
   
  console.log(voucher.ImpTotal+" = "+impNeto+" + "+impIVA)
  
  return voucher;
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

