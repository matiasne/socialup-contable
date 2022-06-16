export class Client{
    client: any;
  static _id: any;
    constructor (
        public _id:string,
        public name:string,
        public image:string,
        public city:string,
        public address: string,
        public email: string,
        public phone: string,
        public idBusiness: string,
        public postCode:string,
        public documentType:string,
        public documentNumber:string,
        public surname:string

    ){}
    public static adapt(item:any):Client{
        return new Client(
            item._id,
            item.name,
            item.image,
            item.city,
            item.address,
            item.email,
            item.phone,
            item.idBusiness,
            item.postCode,
            item.documentType,
            item.documentNumber,
            item.surname,
           
        )
    }
}