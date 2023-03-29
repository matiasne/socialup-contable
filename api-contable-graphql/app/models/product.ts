import { Business } from "./business";

export interface IProductDTO {
  business: Business;
  name: String;
  description: String;
  codigo: String;
  costPrice: String;
  salePrice: String;
  image: String;
}

export interface IProduct {
  business: Business;
  name: String;
  description: String;
  codigo: String;
  costPrice: String;
  salePrice: String;
  image: String;
}

export class Product implements IProduct {
  constructor(
    public business: Business,
    public name: string,
    public description: string,
    public codigo: string,
    public costPrice: string,
    public salePrice: string,
    public image: string
  ) {}

  public static adapt(item: any): Product {
    return new Product(
      item.business,
      item.name,
      item.description,
      item.codigo,
      item.costPrice,
      item.salePrice,
      item.image
    );
  }
}
