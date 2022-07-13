import { Business } from "../../business/models/business";
import { Client } from "../../clients/models/client";
import { Product } from "../../products/models/product";
import { Discount } from "./discount";
import { SaleProduct } from "./sale-product";

export class Sale {

    

    constructor (
        public business:Business,
        public client:Client,
        public saleProducts:Array<SaleProduct> = [],
        public total:number = 0,
        public date:Date = new Date(),
        public discount:Discount
     ){
       
    }

   
}