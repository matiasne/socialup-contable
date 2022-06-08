export class Business{
    business: any;
    constructor (
        public _id:string,
        public name:string,
        public image:string,
        public category: string,
        public address: string,
        public email: string,
        public phone: string,
        public idUser: string
    ){}

    public static adapt(item:any):Business{
        return new Business(
            item._id,
            item.name,
            item.email,
            item.image,
            item.category,
            item.address,
            item.phone,
            item.idUser,
        )
    }
}