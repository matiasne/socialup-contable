import { Navigate, Outlet } from "react-router-dom";
import { getSessionServices } from "../services/session.service";

const useAuth = () => {
  let token = getSessionServices();
  if (token === "") {
    return "";
  } else {
    return token;
  }
};

export const ProtectedRoutes = () => {
  const isAuth = useAuth();
  return isAuth !== "" ? <Outlet /> : <Navigate to="/login" />;
};
