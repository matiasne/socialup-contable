export interface IBusinessDTO {
  address: string;
  category: string;
  createdAt: string;
  email: string;
  image: string;
  name: string;
  phone: string;
  updatedAt: string;
  user: string;
  _id: string;
}

export class Business {
  constructor(
    public _id: string,
    public name: string,
    public image: string,
    public category: string,
    public address: string,
    public email: string,
    public phone: string,
    public idUser: string
  ) {}

  public static adapt(item: any): Business {
    return new Business(
      item._id,
      item.name,
      item.image,
      item.category,
      item.address,
      item.email,
      item.phone,
      item.idUser
    );
  }
}
