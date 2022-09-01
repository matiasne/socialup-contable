import { Business } from "../../features/business/models/business";
import { User } from "../../models/user";

export class Session {

    public user = new User('', '', '', '', '', '', '', '', '');
    public business = new Business('', '', '', '', '', '', '', '');

    constructor(
        public token: string,
        user?: User,
        business?: Business
    ) {
        this.user = user;
        this.business = business;
    }
}