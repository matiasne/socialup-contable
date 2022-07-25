import { Product } from "../../products/models/product";
import { Variation } from "./variation";

export class SaleProduct extends Product{
    constructor (
        public _id:string,
        public name:string,
        public description:string,
        public code: string,
        public costPrice: string,
        public salePrice: string,
        public idBusiness: string,
        public image:string,
        public amount:number,
        public detail:string,
        public subTotal:number,
        public variation:Variation
    ){
        super(_id,name,description,code,costPrice,salePrice,idBusiness,image)
    }

    public static adapt(item:any):SaleProduct{        
        return new SaleProduct(
            item._id,
            item.name,
            item.description,
            item.code,
            item.costPrice,
            item.salePrice,
            item.idBusiness,
            item.image,
            item.amount,
            item.detail,
            item.subTotal,
            item.variation
        )
    }
}