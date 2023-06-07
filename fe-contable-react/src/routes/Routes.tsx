import { Route, Router, Routes } from "react-router-dom";
import FormClient from "../features/Clients/components/form-client/formClient";
import { ListProduct } from "../features/products/components/list-product/list-product";
import { BoxCreate } from "../pages/createBox/create-box.page";
import { SaleCreate } from "../pages/createSale/create-sale.page";
import { FormLogin } from "../pages/formLogin/formLogin";
import { FormRegister } from "../pages/formRegister/formRegister";
import { Dialog } from "../shared/Components/modal/Dialogs";
import { ListBox } from "../features/Boxes/Components/list-box/list-box";
import { BusinessCreate } from "../pages/createBusiness/create-business.page";
import FormProductComponent from "../features/products/components/form-product/formProduct";
import { PrivateRoute } from "./PrivateRoutes";

export const AppRouter = () => {
  return (
    <Routes>
      {/*Rutas Publicas🔓   👇👇👇*/}
      <Route path="/login" element={<FormLogin />} />
      <Route path="/register" element={<FormRegister />} />

      {/*Rutas privadas🔐   👇👇👇*/}
      <Route path="/" element={<PrivateRoute />}>
        <Route path="/business" element={<BusinessCreate />} />
        <Route path="/sale" element={<SaleCreate />} />
        <Route
          path="/products"
          element={<ListProduct name={""} description={""} salePrice={""} />}
        />
        <Route path="/product" element={<FormProductComponent />} />
        <Route path="/dialogs" element={<Dialog />} />
        <Route path="/Clients" element={<FormClient />} />
        <Route path="/listbox" element={<ListBox />} />
      </Route>
    </Routes>
  );
};
