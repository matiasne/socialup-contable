import axios from "axios";
import { ILoginUser, IUser } from "../models/user";
import { GLOBAL } from "../shared/services/GLOBAL";

const UserInterceptors = async (state: any) => {
  const user = await axios.get(GLOBAL.url + "/user/63c59ebdbc7458635ed25c45");
  state(user.data.user);
};

const authenticate = async (
  email: ILoginUser["email"],
  password: ILoginUser["password"]
) => {
  await axios
    .post(GLOBAL.url + "/login", {
      email,
      password,
    })
    .then((response) => {
      return response.data.token;
    })
    .catch(function (error) {
      console.log(error);
    });
};

const register = async (
  name: IUser["name"],
  email: IUser["email"],
  password: IUser["password"],
  surname: IUser["address"]
) => {
  await axios
    .post(GLOBAL.url + "/register", {
      name,
      email,
      password,
      surname,
    })
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => console.log(error));
};

export const AxiosInterceptors = {
  UserInterceptors,
  authenticate,
  register,
};
