import { Business } from "./business";

export interface IClientDTO {
  business: Business;
  name: string;
  image: string;
  city: string;
  address: string;
  email: string;
  phone: string;
  postCode: string;
  documentType: string;
  documentNumber: string;
  surname: string;
}

export interface IClient {
  business: Business;
  name: string;
  image: string;
  city: string;
  address: string;
  email: string;
  phone: string;
  postCode: string;
  documentType: string;
  documentNumber: string;
  surname: string;
}

export class Client implements IClient {
  constructor(
    public business: Business,
    public name: string,
    public image: string,
    public city: string,
    public address: string,
    public email: string,
    public phone: string,
    public postCode: string,
    public documentType: string,
    public documentNumber: string,
    public surname: string
  ) {}

  public static adapt(item: any): Client {
    return new Client(
      item.business,
      item.name,
      item.image,
      item.city,
      item.address,
      item.email,
      item.phone,
      item.postCode,
      item.documentType,
      item.documentNumber,
      item.surname
    );
  }
}
