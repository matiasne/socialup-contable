import { Business } from "../../business/models/business";
import { Client } from "../../clients/models/client";
import { Product } from "../../products/models/product";
import { SaleProduct } from "./sale-product";

export class Sale {

    public client:Client
    public saleProducts:Array<SaleProduct> = []
    public total:number = 0;
    public date:Date = new Date()

    constructor (
        public business:Business
    ){
       
    }

   
}