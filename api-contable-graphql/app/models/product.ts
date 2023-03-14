export interface IProduct {
  name: String;
  description: String;
  codigo: String;
  costPrice: String;
  salePrice: String;
  image: String;
}

export class Product implements IProduct {
  constructor(
    public name: String,
    public description: String,
    public codigo: String,
    public costPrice: String,
    public salePrice: String,
    public image: String
  ) {}

  public static adapt(item: any): Product {
    return new Product(
      item.name,
      item.description,
      item.codigo,
      item.costPrice,
      item.salePrice,
      item.image
    );
  }
}
