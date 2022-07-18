import { Injectable } from "@angular/core";
import { SelectedService } from "src/app/services/global/selected.service";
import { HelperService } from "src/app/services/helpers.service";
import { HttpClient, HttpResponse, HttpHeaders } from "@angular/common/http";
import { Client } from "../../clients/models/client";
import { Sale } from "../models/sale";
import { SaleProduct } from "../models/sale-product";
import { BaseCRUDService } from "../../../services/base-crud.service";
import { Observable } from "rxjs";
import { GLOBAL } from "src/app/services/global";
import { StorageSessionService } from "../../../services/storage-session.service";
import { Discount, DiscountType } from "../models/discount";

@Injectable({ providedIn: 'root' })
export class CurrentSaleService extends BaseCRUDService{ 
    
    public currentSale:Sale;
    public url: string;

    
    constructor (
        public _http: HttpClient,
        private selectedService:SelectedService,
        public helperService: HelperService,
        public storageSessionService: StorageSessionService,
    ){      
        super(_http,storageSessionService)
        this.url = GLOBAL.url+'/sale';

        this.selectedService.obsSelectedBusiness().subscribe(business =>{
            this.currentSale = new Sale(business)
        })
        
    }

    addClient(client:Client){
        this.currentSale.client = client;
    }

    addSaleProduct(saleProduct:SaleProduct){
        this.currentSale.saleProducts.push(saleProduct)
        this.refreshTotal()        
    }

    addDiscount(discount:Discount){
        this.currentSale.discounts.push(discount)
        this.refreshTotal()     
    }

    updateSaleProduct(saleProduct:SaleProduct){        
        this.refreshTotal()        
    }

    deleteSaleProduct(saleProduct:SaleProduct){
        this.currentSale.saleProducts = this.currentSale.saleProducts.filter((item) => item !== saleProduct)
        this.refreshTotal()        
    }

    refreshTotal(){
        this.currentSale.total = 0;
        this.currentSale.saleProducts.forEach(element=>{
            this.currentSale.total += element.subTotal;
        })
    }

   add(sale:Sale){

    let formData = this.helperService.toFormData(sale)
    console.log(formData)
     this.post(this.url,sale).subscribe({
        next:(data)=>{
            console.log(data)
        }
     })
   }

   calculateProductSubTotal(saleProduct:SaleProduct){
    let subTotal = Number(saleProduct.amount)*Number(saleProduct.salePrice)
    let descuento=0
    if(saleProduct.discount.type == DiscountType.percentage){
        descuento = subTotal * Number(saleProduct.discount.value) / 100
        subTotal = subTotal - descuento
    }
    if(saleProduct.discount.type == DiscountType.amount){
        descuento = subTotal - Number(saleProduct.discount.value)
        subTotal =  descuento
    }

        return subTotal;
   }

calculateSaleTotal(){
    console.log('calculateSaleTotal')
    // let Total = Number(saleProduct.amount)*Number(saleProduct.salePrice)
    // let descuento=0
    // if(saleProduct.discount.type == DiscountType.percentage){
    //     descuento = subTotal * Number(saleProduct.discount.value) / 100
    //     subTotal = subTotal - descuento
    // }
    // if(saleProduct.discount.type == DiscountType.amount){
    //     descuento = subTotal - Number(saleProduct.discount.value)
    //     subTotal =  descuento
    // }
    
    //     return Total;
   
}
}