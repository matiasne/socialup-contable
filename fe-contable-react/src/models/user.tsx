export interface IUser {
  id: string;
  name: string;
  address: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

export type ILoginUser = Pick<IUser, "id" | "email" | "password">;
