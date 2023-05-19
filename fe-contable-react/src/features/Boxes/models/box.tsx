export interface IBox {
  _id: string;
  business: string;
  Image: string;
  Name: string;
  Status: string;
  ActualAmount: string;
  DailyAmount: number;
}

export type IitemBox = Pick<IBox, "Name" | "ActualAmount">;
