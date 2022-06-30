import { Business } from "../features/business/models/business";
import { User } from "./user";

export class Session{
    constructor (
        public token:string,
        public user:User,
        public business:Business
    ){}
}