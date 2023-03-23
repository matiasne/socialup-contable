import { Business } from "./business";

export interface IBoxDTO {
  business: Business;
  name: String;
  status: String;
  actualAmount: Number;
  image: String;
  dailyAmount: Number;
}

export interface IBox {
  business: Business;
  name: String;
  status: String;
  actualAmount: Number;
  image: String;
  dailyAmount: Number;
}

export class Box implements IBox {
  constructor(
    public business: Business,
    public name: string,
    public status: string,
    public actualAmount: number,
    public image: string,
    public dailyAmount: number
  ) {}

  public static adapt(item: any): Box {
    return new Box(
      item.business,
      item.name,
      item.status,
      item.actualAmount,
      item.image,
      item.dailyAmount
    );
  }
}
