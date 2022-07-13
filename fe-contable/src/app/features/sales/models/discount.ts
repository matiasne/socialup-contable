import { Business } from "../../business/models/business";
import { Client } from "../../clients/models/client";
import { Product } from "../../products/models/product";
import { SaleProduct } from "./sale-product";

export enum DiscountType{
    empty = "empty",
    percentage = "percentage",
    amount = "amount"
}

export class Discount {

    public type:DiscountType = DiscountType.empty
    public value:number = 0;
    public description:string = "";

    constructor (
        
    ){
       
    }

   
}