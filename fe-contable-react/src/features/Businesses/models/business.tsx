export interface IBusiness {
  BusinessName: string;
  Phone: string;
  Mail: string;
  Address: string;
  BusinessCategory: string;
  Image: string;
  touched: string;
}
export type IiBusiness = Pick<
  IBusiness,
  "BusinessName" | "Phone" | "Address" | "Mail"
>;
