export class Bussines{
    constructor (
        public _id:string,
        public name:string,
        public image:string,
        public category: string,
        public address: string,
        public email: string,
        public phone: string
    ){}

    public static adapt(item:any):Bussines{
        return new Bussines(
            item._id,
            item.name,
            item.email,
            item.image,
            item.category,
            item.address,
            item.phone
        )
    }
}