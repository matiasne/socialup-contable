export interface IBox {
  _id: string;
  idBusiness: string;
  Image: string;
  Name: string;
  Status: string;
  ActualAmount: string;
  DailyAmount: string;
}

export type IitemBox = Pick<IBox, "Name" | "ActualAmount">;
