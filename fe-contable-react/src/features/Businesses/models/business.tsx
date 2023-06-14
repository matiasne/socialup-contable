export interface IBusiness {
  name: string;
  phone: string;
  email: string;
  address: string;
  BusinessCategory: string;
  Image: string;
  touched: string;
}
export type IiBusiness = Pick<
  IBusiness,
  "name" | "phone" | "address" | "email"
>;
