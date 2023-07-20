export interface IBox {
  id: string;
  Image?: string;
  Name: string;
  Status: string;
  ActualAmount: number;
  DailyAmount: number;
  IdBusiness: string;
}

export type IitemBox = Pick<IBox, "Name" | "ActualAmount">;
