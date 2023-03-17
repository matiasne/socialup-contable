import axios from "axios";
import { GLOBAL } from "../shared/services/GLOBAL";

const UserInterceptors = async (state: any) => {
  const user = await axios.get(GLOBAL.url + "/user/63c59ebdbc7458635ed25c45");
  state(user.data.user);
};

export const AxiosInterceptors = {
  UserInterceptors,
};
