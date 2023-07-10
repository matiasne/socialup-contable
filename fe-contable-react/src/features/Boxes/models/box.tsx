export interface IBox {
  id: string;
  Image?: string;
  Name: string;
  Status: string;
  ActualAmount: string;
  DailyAmount: string;
  IdBusiness: string;
}

export type IitemBox = Pick<IBox, "Name" | "ActualAmount">;
