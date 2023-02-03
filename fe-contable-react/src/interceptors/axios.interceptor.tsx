import axios from "axios";
import { ILoginUser } from "../models/user";
import { GLOBAL } from "../shared/services/GLOBAL";

const UserInterceptors = async (state: any) => {
  const user = await axios.get(GLOBAL.url + "/user/63c59ebdbc7458635ed25c45");
  state(user.data.user);
};

const Usuario = async (
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

export const AxiosInterceptors = {
  UserInterceptors,
  Usuario,
};
