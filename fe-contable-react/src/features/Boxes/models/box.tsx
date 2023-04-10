export interface IBox {
  _id: string;
  idBusiness: string;
  Image: string;
  Name: string;
  Status: string;
  ActualAmount: number;
  DailyAmount: number;
}

export type IitemBox = Pick<IBox, "Name" | "ActualAmount">;
