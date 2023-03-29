export interface IProduct {
  _id?: string;
  name: string;
  description: string;
  code?: string;
  costPrice?: number;
  salePrice: number;
  image?: string;
}
