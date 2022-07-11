import { Product } from "../../products/models/product";

export class SaleProduct extends Product{
    constructor (
        public name:string,
        public description:string,
        public code: string,
        public costPrice: string,
        public salePrice: string,
        public idBusiness: string,
        public image:string,
        public amount:string,
        public detail:string,
        public subTotal:number
    ){
        super('',name,description,code,costPrice,salePrice,idBusiness,image)
    }

    public static adapt(item:any):SaleProduct{        
        return new SaleProduct(
            item.name,
            item.description,
            item.code,
            item.costPrice,
            item.salePrice,
            item.idBusiness,
            item.image,
            item.amount,
            item.detail,
            item.subTotal
        )
    }
}