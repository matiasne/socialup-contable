import { Business } from "../../business/models/business";
import { Client } from "../../clients/models/client";
import { Product } from "../../products/models/product";
import { SaleProduct } from "./sale-product";

export enum VariationType{
    empty = "empty",
    percentage = "%",
    amount = "$"
}

export class Variation {

    public type:VariationType = VariationType.empty
    public value:number = 0;
    public description:string = "";

    constructor (
        
    ){
       
    }

   
}