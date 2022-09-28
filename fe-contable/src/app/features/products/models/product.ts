export class Product {
  constructor(
    public _id: string,
    public name: string,
    public description: string,
    public code: string,
    public costPrice: string,
    public salePrice: string,
    public idBusiness: string,
    public image: string
  ) {}
  public static adapt(item: any): Product {
    return new Product(
      item._id,
      item.name,
      item.description,
      item.code,
      item.costPrice,
      item.salePrice,
      item.idBusiness,
      item.image
    );
  }
}
