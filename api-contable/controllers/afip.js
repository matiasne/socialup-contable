'use strict'

import { AfipVoucher, CbteAsoc, EnumAfipConceptos, EnumAfipMoneda, EnumAfipPersonaJuridica, EnumAfipTiposComprobantes, EnumAfipTiposDocumentos, IvaItem } from "../models/afipVoucher";
let os = require('os')
const Afip = require('@afipsdk/afip.js');
const fs = require('fs');

var afipRepository = require('../repositories/afip');

function initAfip(comercioId,ptoVenta){     

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
        return afip;
    }
    catch(err){
        console.log(err)
    }     
}

function prueba(req,res){
    res.status(200).send("Prueba Ok!")
}

function register(req,res){  
    let params = req.body; 
    let afipRepo = new afipRepository();    
    let afip = await afipRepo.create(params);    
    res.status(200).send({data: afip});
}


function status(req,res){    
    try{         
        let afip = await this.initAfip(req.body.comercioId,req.body.ptoVenta)
        let serverStatus = await afip.ElectronicBilling.getServerStatus();
        return res.status(200).send({data:serverStatus});    
    }   
    catch(err){
        console.log(err)
        return res.status(500).send({data:serverStatus}); 
    }             
}


function voucherInfo(req,res){
   //req.body.nroComprobante = 1
   // req.body.ptoVenta = 1
   // req.body.tipoComprobante = 6
    let afip = await this.initAfip(req.body.comercioId,req.body.ptoVenta)
    const voucherInfo = await afip.ElectronicBilling.getVoucherInfo(
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
  
    let afip = await this.initAfip(req.body.comercioId,req.body.ptoVenta)
    const voucherInfo = await afip.ElectronicBilling.getLastVoucher(1,6); //Devuelve la información del comprobante 1 para el punto de venta 1 y el tipo de comprobante 6 (Factura B)
  
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

  let afip = await this.initAfip(req.body.comercioId,req.body.ptoVenta)
  const numero = await afip.ElectronicBilling.getLastVoucher(1,6); //Devuelve la información del comprobante 1 para el punto de venta 1 y el tipo de comprobante 6 (Factura B)
  const voucherInfo = await afip.ElectronicBilling.getVoucherInfo(numero,1,6); //Devuelve la información del comprobante 1 para el punto de venta 1 y el tipo de comprobante 6 (Factura B)
  
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
    let afip = await this.initAfip(req.body.comercioId,req.body.ptoVenta)
    //Aca debo obtener el último número de voucher getLastVoucher
    const lastVoucherNumber = await afip.ElectronicBilling.getLastVoucher(1,6); //Devuelve la información del ultimo voucher
    
    let voucher:AfipVoucher = new AfipVoucher();
    voucher.CantReg ="1";
    voucher.PtoVta = "1"; // Punto de venta
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
        req.body.iva.forEach((i:any) => {
            let iva = new IvaItem()
            iva.asignarValores(i)
            voucher.Iva.push(iva)
        });                    
    }              

    const respuesta = await afip.ElectronicBilling.createVoucher(voucher);    
    return res.status(200).send({CAE:respuesta['CAE'],CAEFchVto:respuesta['CAEFchVto']});         
      
    //CAE asignado el comprobante
    //Fecha de vencimiento del CAE (yyyy-mm-dd)
}   

createFacturaFromPedido(req,res){
  try{
    console.log(req.user.comercioId+" "+req.body.pedidoId+" "+req.user.ptoVenta)
    let pedidoRef =  db.collection('comercios/'+req.user.comercioId+'/pedidos').doc(req.body.pedidoId)
    pedidoRef.get().then(function (doc:any)=>{
      if(doc.exists){

        let pedido:any = doc.data();
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

        let afip = await this.initAfip(req.body.comercioId,req.body.ptoVenta)    
        let puntoDeVenta = req.user.ptoVenta;      
        const voucherDate = parseInt(req.body.CbteFch.replace(/-/g, ''))   
        
                          
        const voucher = await this.createVoucherFromPedido(afip,pedido,voucherDate,voucherTipo,puntoDeVenta)
           
        try{
          const respuesta = await afip.ElectronicBilling.createVoucher(voucher);  
          
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

          this.guardarArchivoTA(req.user.comercioId,req.user.nroDoc,db)
          return res.status(200).send(datos);

          
        }
        catch(err){
          console.log("err")
          console.log(err)
          this.guardarArchivoTA(req.user.comercioId,req.user.nroDoc,db)
          return res.status(500).send({message:err.message});
        }  

      }
      else{
        this.guardarArchivoTA(req.user.comercioId,req.user.nroDoc,db)
        res.status(200).send({message:"Pedido no existe"});
      }
    }).catch((err:any)=>{
      res.status(500).send(err);
      console.log(err)
      
    })
  }
  catch(err){
    console.log(err)
    res.status(500).send({message:err});
  }     
  
}

createNotaCreditoFromPedido(req,res){
  try{
    console.log(req.user.comercioId+" "+req.body.pedidoId+" "+req.user.ptoVenta)
    let pedidoRef =  db.collection('comercios/'+req.user.comercioId+'/pedidos').doc(req.body.pedidoId)
    pedidoRef.get().then(function (doc:any)=>{
      if(doc.exists){

        let pedido:any = doc.data();
        pedido.id = doc.id;

        let voucherTipo = EnumAfipTiposComprobantes.notaCreditoC;

        if(doc.data().afipFactura.voucherTipo == EnumAfipTiposComprobantes.facturaB){
          voucherTipo = EnumAfipTiposComprobantes.notaCreditoB;
        }

        if(doc.data().afipFactura.voucherTipo == EnumAfipTiposComprobantes.facturaA){
          voucherTipo = EnumAfipTiposComprobantes.notaCreditoA;
        }
        
        let afip = await this.initAfip(req.body.comercioId,req.body.ptoVenta)    
        let puntoDeVenta = req.user.ptoVenta;      
        const voucherDate = parseInt(req.body.CbteFch.replace(/-/g, ''))          
                            
        const voucher = await this.createVoucherFromPedido(afip,pedido,voucherDate,voucherTipo,puntoDeVenta,req.body.montoReembolso,null,null,null)
                             
        try{
          const respuesta = await afip.ElectronicBilling.createVoucher(voucher);  
          console.log("respuesta")
          console.log(respuesta)
          
          let datos = {afipNotaCredito:{CbteTipo:voucherTipo,CAE:respuesta['CAE'],CAEFchVto:respuesta['CAEFchVto']}}
          
          var writeOperation = await pedidoRef.set(datos,{merge:true})
          console.log(writeOperation)

          this.guardarArchivoTA(req.user.comercioId,req.user.nroDoc,db)
          return res.status(200).send(datos);

          
        }
        catch(err){
          console.log("err")
          console.log(err)
          this.guardarArchivoTA(req.user.comercioId,req.user.nroDoc,db)
          return res.status(500).send({message:err.message});
        }

        

      }
      else{
        this.guardarArchivoTA(req.user.comercioId,req.user.nroDoc,db)
        res.status(200).send({message:"Pedido no existe"});
      }
    }).catch((err:any)=>{
      res.status(500).send(err);
      console.log(err)
      
    })
  }
  catch(err){
    console.log(err)
    res.status(500).send({message:err});
  }     
  
}

guardarArchivoTA(comercioId:any,nroDoc:any,db:any){ //debido a que el archivo temp al finalizar la funcion desaparece lo guardamos en firestor y luego lo retomamos al iniciar afip
  let TAfile = os.tmpdir()+'/TA-'+nroDoc+'-wsfe.json';
  if (fs.existsSync(TAfile)) {
    console.log("Guardando archivo en documento")
    fs.readFile(TAfile,'utf-8',function(err:any, jsonData:any){
      if (err) throw err;    
      var content:any = JSON.parse(jsonData);          
      const afipRef = db.collection('afip');
      afipRef.doc(comercioId).set({afipTA:content}, {merge: true}).then((data:any)=>{
        console.log("guardado ok")
      });           
  });
  }         
  else{
    console.log("Aun no existe TA")
  }
}


  

function createVoucherFromPedido(afip:any,pedido:any,voucherDate:any,voucherTipo:any,puntoDeVenta:any,montoReembolso=0,FchServDesde = null,FchServHasta=null,FchVtoPago=null){
  let voucher:AfipVoucher = new AfipVoucher();    
  
  const lastVoucherNumber = await afip.ElectronicBilling.getLastVoucher(puntoDeVenta,voucherTipo); //Devuelve la información del ultimo voucher
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
      pedido.items.forEach((item:any) => {
        impuesto = item.impuestoPorcentaje;
        console.log(item.nombre)
        impNeto += (Number(item.precioTotal) / (1+Number(item.impuestoPorcentaje))).toFixed(2)
        impIVA += (Number(impNeto) * Number(item.impuestoPorcentaje)).toFixed(2)
      });
    }
  

    if(pedido.recargos.length > 0){           
      pedido.recargos.forEach((item:any) => {
        console.log(item.nombre)
        impNeto += (Number(item.monto) / (1+Number(impuesto))).toFixed(2)
        impIVA += (Number(impNeto) * Number(impuesto)).toFixed(2)
      });
    }

    //No recuerdo si el descuento se factura
  /*  if(pedido.descuentos.length > 0){           
      pedido.descuentos.forEach((item:any) => {
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

  pedido.items.forEach((element:any) => {
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

function salesPoint(req,res){
  let afip = await this.initAfip(req.body.comercioId,req.body.ptoVenta)
  const salesPoints= await afip.ElectronicBilling.getSalesPoints();
  return res.status(200).send({salesPoints:salesPoints});	
}

function voucherTypes(req,res){
  let afip = await this.initAfip(req.body.comercioId,req.body.ptoVenta)
  const voucherTypes = await afip.ElectronicBilling.getVoucherTypes();
  return res.status(200).send({voucherTypes:voucherTypes});	               
}

function conceptTypes(req,res){
  let afip = await this.initAfip(req.body.comercioId,req.body.ptoVenta)
  const conceptTypes = await afip.ElectronicBilling.getConceptTypes();
  return res.status(200).send({conceptTypes:conceptTypes});   
}

function documentTypes(req,res){
  let afip = await this.initAfip(req.body.comercioId,req.body.ptoVenta)
  const documentTypes  = await afip.ElectronicBilling.getDocumentTypes();
  return res.status(200).send({documentTypes:documentTypes }); 	              
}

function aloquotTypes(req,res){

  let afip = await this.initAfip(req.body.comercioId,req.body.ptoVenta)
  const aloquotTypes  = await afip.ElectronicBilling.getAliquotTypes();
  return res.status(200).send({aloquotTypes :aloquotTypes  });   	     
}

function currenciesTypes(req,res){

  let afip = await this.initAfip(req.body.comercioId,req.body.ptoVenta)
  const currenciesTypes = await afip.ElectronicBilling.getCurrenciesTypes();
  return res.status(200).send({currenciesTypes :currenciesTypes  });        
      
}

function optionTypes(req,res){
  let afip = await this.initAfip(req.body.comercioId,req.body.ptoVenta)
  const optionTypes  = await afip.ElectronicBilling.getOptionsTypes();
  return res.status(200).send({optionTypes  :optionTypes   });   
        
}

function taxTypes(req,res){
  let afip = await this.initAfip(req.body.comercioId,req.body.ptoVenta)
  const taxTypes = await afip.ElectronicBilling.getTaxTypes();
  return res.status(200).send({taxTypes :taxTypes});           
}

function consultarPadron(req,res){
  let afip = await this.initAfip(req.body.comercioId,req.body.ptoVenta)
  const taxpayerDetails = await afip.RegisterScopeThirteen.getTaxpayerDetails(req.body.cuit);
  return res.status(200).send({taxTypes :taxpayerDetails});            
}    

nuevoPedido(req,res){

  if(req.body.status === "processing"){
      req.body["statusCobro"] = 1;           
  }
  else if(req.body.status === "completed"){
      req.body["statusCobro"] = 2 
  }
  else if(req.body.status === "cancelled"){
      req.body["statusCobro"] = 3
  }
  else if(req.body.status === "refunded"){
      req.body["statusCobro"] = 4
  }
db.collection('comercios/'+req.query.comercioId+"/pedidosWoocommerce").doc(req.body.id.toString()).set(req.body).then((data:any)=>{

      console.log("pedidos guardado")    


      db.collection("comercios/"+req.query.comercioId+"/roles").where("rol","==","Administrador").get().then((querySnapshot) => {
          console.log("rol encontrado")
          querySnapshot.forEach((doc:any) => {
              console.log(doc.id)
              db.collection('users').doc(doc.id).get().then((doc:any) => {
                 
                  // doc.data() is never undefined for query doc snapshots
                  console.log(doc.data().notificationCelulartoken);

                          
                  var message ={
                      "token" : doc.data().notificationCelulartoken,
                      "notification" : {
                          "body" : "Se ha realizado un pedido desde tu página web",
                          "title": "Nuevo Pedido"
                      }
                  }

                  admin.messaging().send(message)
                  .then((response) => {
                      // Response is a message ID string.
                      console.log('Successfully sent message:', response);
                      return res.status(200).send({data:"fcm enviado"});
                  })
                  .catch((error) => {
                      console.log('Error sending message:', error);
                      return res.status(200).send({data:"Error enviando fcm"});
                  });           
                  return null;
                  //return res.status(200).send(response);
              })
              .catch((err) => {
                  return  res.status(500).send(err);
              });          
          });
          return null
          //return res.status(200).send(response);
      })
      .catch((err) => {
          return  res.status(500).send(err);
      });

      return null;
  }).catch((err) => {
      return  res.status(500).send(err);
  });
}