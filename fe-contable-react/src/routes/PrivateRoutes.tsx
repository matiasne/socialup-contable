import { Navigate, Outlet } from "react-router-dom";
import { getSessionServices } from "../auth/services/authService";

export const ProtectedRoute = () => {
  const session = getSessionServices();
  console.log(session);
  return session ? <Outlet /> : <Navigate to="/login" />;
};
