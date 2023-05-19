export interface IBox {
  _id: string;
  idBusiness: string;
  Image: File;
  Name: string;
  Status: string;
  ActualAmount: string;
  DailyAmount: number;
}

export type IitemBox = Pick<IBox, "Name" | "ActualAmount">;
