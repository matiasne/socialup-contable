import { Business } from "../../business/models/business";
import { Client } from "../../clients/models/client";
import { Variation } from "./variation";
import { SaleProduct } from "./sale-product";
import { Status } from "./status";
import { Payment } from "./payment";


export class Sale {

    constructor (
        public _id: String,
        public client:Client,
        public saleProducts:Array<SaleProduct> = [],
        public variations:Array<Variation> = [],
        public total:number = 0,
        public date:Date = new Date(),
        public status:Status,
        public payments:Array<Payment>=[],
        public business:Business,
    ){
       
    }
    public static adapt(item:any):Sale{
        return new Sale(
            item._id,
            item.client,
            item.saleProducts,
            item.variations,
            item.total,
            item.date,
            item.status,
            item.payments,
            item.business
        
           
        )
    }
   
}