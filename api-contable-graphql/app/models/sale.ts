import { Box } from "./box";
import { Business } from "./business";
import { Client } from "./client";
import { Product } from "./product";

export interface ISaleDTO {
  idBusiness: Business;
  business: any;
  client: Client;
  product: [Product];
  total: String;
  payments: String;
  variations: String;
  billingDate: String;
  satus: String;
  box: Box;
}

export interface ISale {
  idBusiness: Business;
  actualBusiness: IActualBusiness;
  client: Client;
  product: [Product];
  total: String;
  payments: String;
  variations: String;
  billingDate: String;
  satus: String;
  box: Box;
}

export interface IActualBusiness {
  name: String;
  address?: String;
}

export class Sale implements ISale {
  constructor(
    public idBusiness: Business,
    public actualBusiness: IActualBusiness,
    public client: Client,
    public product: [Product],
    public total: String,
    public payments: String,
    public variations: String,
    public billingDate: String,
    public satus: String,
    public box: Box
  ) {}

  public static adapt(item: any): Sale {
    return new Sale(
      item.idBusiness,
      item.business,
      item.client,
      item.product,
      item.total,
      item.payments,
      item.variations,
      item.billingDate,
      item.satus,
      item.box
    );
  }
}
