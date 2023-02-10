export interface IUserDTO {
  name: string;
  surname: string;
  email: string;
  password: string;
  role: string;
  image: string;
  address: string;
  gender: string;
  phone: string;
}

export interface IUser {
  name: string;
  surname: string;
  email: string;
  password: string;
  role: string;
  image: string;
  address: string;
  gender: string;
  phone: string;
}

export class User implements IUser {
  constructor(
    public name: string,
    public surname: string,
    public email: string,
    public password: string,
    public role: string,
    public image: string,
    public address: string,
    public gender: string,
    public phone: string
  ) {}

  public static adapt(item: any): User {
    return new User(
      item.name,
      item.surname,
      item.email,
      item.password,
      item.role,
      item.image,
      item.address,
      item.gender,
      item.phone
    );
  }
}
