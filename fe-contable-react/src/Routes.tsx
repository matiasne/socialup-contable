import { Route, Routes } from "react-router-dom";
import { FormForgotPassword } from "./pages/forgot-password/form-forgotpassword";
import { FormLogin } from "./pages/formLogin/formLogin";
import { FormRegister } from "./pages/formRegister/formRegister";
import { RouterLayout } from "./shared/NavBar/RouterLayout";

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<RouterLayout />}>
        <Route path="/nose" element={<div>Ingrese la url de la pagina</div>} />
        <Route path="/forgot-password" element={<FormForgotPassword />} />
      </Route>

      <Route path="/login" element={<FormLogin />} />
      <Route path="/register" element={<FormRegister />} />
    </Routes>
  );
};
