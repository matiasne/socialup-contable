export class User{
    constructor (
        public _id:string,
        public name:string,
        public surname:string,
        public email:string,
        public role:string,
        public image:string ="",
        public gender: string,
        public address: string,
        public phone: string,
    ){}
}