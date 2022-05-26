export class EnumAfipTiposComprobantes {
    facturaA = 1; 
    notaDebitoA = 2; 
    notaCreditoA = 3;
    reciboA =4;
    notaVentaAlContadoA = 5;
    facturaB = 6; 
    notaDebitoB = 7; 
    notaCreditoB = 8;
    reciboB =9;
    notaVentaAlContadoB = 10;
    facturaC = 11; 
    notaDebitoC = 12; 
    notaCreditoC = 13;
    reciboC =14;
    notaVentaAlContadoC = 15;
}


export class EnumAfipTiposDocumentos {
    cuit = 80; 
    cuil = 86; 
    cdi =87;
    dni = 96;
    consumidorFinal = 99
}

export class EnumAfipAlicuotasIva {
    porcentaje_0 = 3;
    porcentaje_10_5 = 4;
    porcentaje_21 = 5;
    porcentaje_27 = 6;
    porcentaje_5 = 7;
    porcentaje_2_5 = 8
}

export class EnumAfipConceptos {
    productos = 1;
    servicios = 2;
    productosServicios = 3
}

export class EnumAfipPersonaJuridica {
    monotributista = 1;
    responsableInscripto = 2;
    ivaExcento=3
}

export class EnumAfipMoneda {
    pesos = "PES";
    dolar = "DOL";
}


export class IvaItem {
    Id ="";
    BaseImp="";
    Importe=""; 
}

export class CbteAsoc{
    Tipo ="";
    PtoVta ="";
    Nro="";
    Cuit="";
}

export class TributoItem{
    Id ="";
    Desc="";
    BaseImp="";
    Alic="";
    Importe ="";
}

export class Opcionales{
    Id="";
    Valor="";
}

export class Compradores{
    DocTipo ="";
    DocNro="";
    Porcentaje="";
}

export class AfipVoucher{
    CantReg ="0";
    PtoVta="1";
    CbteTipo="";
    Concepto = 0;
    DocTipo=0; //esto se agrega cuando es un adquirido
    DocNro=""; //esto se agrega cuando es un adquirido
    CbteDesde=0; //esto se agrega cuando es un adquirido
    CbteHasta=0; //esto se agrega cuando es un adquirido
    CbteFch=0; //esto se agrega cuando es un adquirido
    FchServDesde=null;
    FchServHasta=null;
    FchVtoPago=null;
    ImpTotal=""; //esto se agrega cuando es un adquirido
    ImpTotConc=""; //esto se agrega cuando es un adquirido
    ImpNeto=""; //esto se agrega cuando es un adquirido
    ImpOpEx=""; //esto se agrega cuando es un adquirido
    ImpIVA=""; //esto se agrega cuando es un adquirido
    ImpTrib=""; //esto se agrega cuando es un adquirido
    MonId=""; //esto se agrega cuando es un adquirido
    MonCotiz=""; //esto se agrega cuando es un adquirido
    Iva=[]; //esto se agrega cuando es un adquirido
    

	constructor(
		
		){
    }
    

}