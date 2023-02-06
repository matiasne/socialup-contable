export interface IUserDTO {
    name:string;
    pass:string;
}

export interface IUser{
     username:string;
     password:string;
}

export class User implements IUser{  

    constructor(
        public username:string,
        public password:string
    ){

    }

    public static adapt(item: any): User {
        return new User(
          item.username,
          item.password
        );
      }

}


