import { User } from "./user";

export class Session{
    constructor (
        public token:string,
        public user:User
    ){}
}