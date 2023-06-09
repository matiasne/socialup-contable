export interface IBusiness {
  name: string;
  Phone: string;
  Mail: string;
  Address: string;
  BusinessCategory: string;
  Image: string;
  touched: string;
}
export type IiBusiness = Pick<
  IBusiness,
  "name" | "Phone" | "Address" | "Mail"
>;
