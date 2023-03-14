import { User } from "./user";

export interface IBusinessDTO {
  user: User;
  name: string;
  address: string;
  category: string;
  email: string;
  image: string;
  phone: string;
}

export interface IBusiness {
  user: User;
  name: string;
  address: string;
  category: string;
  email: string;
  image: string;
  phone: string;
}

export class Business implements IBusiness {
  constructor(
    public user: User,
    public name: string,
    public address: string,
    public category: string,
    public email: string,
    public image: string,
    public phone: string
  ) {}

  public static adapt(item: any): Business {
    return new Business(
      item.user,
      item.name,
      item.address,
      item.category,
      item.email,
      item.image,
      item.phone
    );
  }
}
