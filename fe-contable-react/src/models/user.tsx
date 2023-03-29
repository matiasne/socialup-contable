export interface IUser {
  HomeAddress: string;
  id: string;
  name: string;
  surname: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: string;
  image: string;
  address: string;
  gender: string;
  phone: string;
}

export type ILoginUser = Pick<IUser, "email" | "password">;
