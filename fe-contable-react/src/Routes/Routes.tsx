import { Route, Routes } from "react-router-dom";
import { ProtectedRoutes } from "../auth/guards/authProvider";
import { getSessionServices } from "../auth/services/session.service";
import { FormForgotPassword } from "../pages/forgot-password/form-forgotpassword";
import { FormLogin } from "../pages/formLogin/formLogin";
import { FormRegister } from "../pages/formRegister/formRegister";
import { RouterLayout } from "../shared/NavBar/RouterLayout";

export const AppRouter = () => {
  return (
    <Routes>
      <Route element={<ProtectedRoutes />}></Route>
      <Route path="" element={<FormLogin />} />
      <Route path="*" element={<FormLogin />} />
      <Route path="/login" element={<FormLogin />} />
      <Route path="/register" element={<FormRegister />} />
      <Route path="/home" element={<FormForgotPassword />} />
    </Routes>
  );
};
