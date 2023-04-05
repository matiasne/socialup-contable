export interface ISale {
  idClient: string;
  idBusiness: string;
  client: string;
  item: string;
  variations: string;
  total: string;
  createdAt: string;
  status: string;
  payments: string;
  boxId: string;
}

export type IitemSale = Pick<ISale, "client" | "item" | "total" | "payments">;
