import { Route, Routes } from "react-router-dom";
import { ProtectedRoutes } from "./auth/guards/authProvider";
import FormClient from "./features/Clients/components/form-client/formClient";
import { ListProduct } from "./features/products/components/list-product/list-product";
import { BoxCreate } from "./pages/createBox/create-box.page";
import { SaleCreate } from "./pages/createSale/create-sale.page";
import { FormProductComponent } from "./features/products/components/formProduct";
import { FormForgotPassword } from "./pages/forgot-password/form-forgotpassword";
import { FormLogin } from "./pages/formLogin/formLogin";
import { FormRegister } from "./pages/formRegister/formRegister";
import AvatarWithInput from "./shared/Components/avatar";
import { Dialog } from "./shared/Components/modal/Dialogs";
import ItemBox from "./features/Boxes/Components/item-box/item-box";
import { ListClient } from "./features/Clients/components/list-client/listClient";
import { ListBox } from "./features/Boxes/Components/list-box/list-box";
import { BusinessCreate } from "./pages/createBusiness/create-business.page";
import FormBusinessComponent from "./features/Businesses/Components/form-business/form-business";

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
      <Route path="/business" element={<BusinessCreate />} />
      <Route path="/sale" element={<SaleCreate />} />
      <Route path="/products" element={<ListProduct />} />
      <Route path="/dialogs" element={<Dialog />} />
      <Route path="/Clients" element={<FormClient />} />
      <Route path="/product" element={<FormProductComponent />} />
      <Route path="/listbox" element={<ListBox />} />
      <Route path="/business" element={<FormBusinessComponent />} />
    </Routes>
  );
};
