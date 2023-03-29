import { Route, Routes } from "react-router-dom";
import { ProtectedRoutes } from "./auth/guards/authProvider";
import { ListProduct } from "./features/products/components/list-product/list-product";
import { BoxCreate } from "./pages/createBox/create-box.page";
import { SaleCreate } from "./pages/createSale/create-sale.page";
import { FormForgotPassword } from "./pages/forgot-password/form-forgotpassword";
import { FormLogin } from "./pages/formLogin/formLogin";
import { FormProfile } from "./pages/formProfile/formProfile";
import { FormRegister } from "./pages/formRegister/formRegister";
import { Dialog } from "./shared/Components/modal/Dialogs";

export const AppRouter = () => {
  return (
    <Routes>
      <Route element={<ProtectedRoutes />}></Route>
      <Route path="" element={<FormLogin />} />
      <Route path="*" element={<FormLogin />} />
      <Route path="/login" element={<FormLogin />} />
      <Route path="/register" element={<FormRegister />} />
      <Route path="/home" element={<FormForgotPassword />} />
      <Route path="/box" element={<BoxCreate />} />
      <Route path="/sale" element={<SaleCreate />} />
      <Route path="/products" element={<ListProduct />} />
      <Route path="/dialogs" element={<Dialog />} />
    </Routes>
  );
};
