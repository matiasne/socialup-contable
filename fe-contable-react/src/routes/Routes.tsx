import { Navigate, Route, Router, Routes } from "react-router-dom";
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
import { ListBusiness } from "../features/Businesses/Components/list-business/list-business";
import { FormBoxComponent } from "../features/Boxes/Components/form-box/formbox.component";
import ItemProduct from "../features/products/components/item-product/itemProduct";
import { DashboardBusiness } from "../features/Businesses/Components/dashboard-business/dashboard-business";
import {
  getSessionBusiness,
  getSessionServices,
} from "../auth/services/authService";
import ListClient from "../features/Clients/components/list-client/listClient";

export const AppRouter = () => {
  const session = getSessionServices();
  const business = getSessionBusiness();

  console.log ("session ", session)
  console.log ("business ", business)



  if (session) {
    if (business) {
      return (
        <Routes>
          <Route path="/dashboard" element={<DashboardBusiness />} />
          <Route path="/sale" element={<SaleCreate />} />
          <Route path="/Client" element={<FormClient client={undefined} />} />
          <Route
            path="/products"
            element={
              <ListProduct
                name={""}
                description={""}
                salePrice={""}
                code={""}
                costPrice={""}
              />
            }
          />
          <Route
            path="/product"
            element={
              <FormProductComponent
                products={undefined}
                onEdit={() => {}}
                onAdd={() => {}}
              />
            }
          />
          <Route path="/dialogs" element={<Dialog />} />
          <Route
            path="/Clients"
            element={
              <ListClient
                name={""}
                image={undefined}
                email={""}
                idBusinnes={""}
              />
            }
          />
          <Route
            path="/listbusiness"
            element={
              <ListBusiness
                name={""}
                phone={""}
                email={""}
                address={""}
                BusinessCategory={""}
                Image={""}
                touched={""}
              />
            }
          />
          <Route path="/box" element={<FormBoxComponent />} />
          <Route
            path="/listbox"
            element={
              <ListBox
                name={""}
                status={""}
                actualAmount={""}
                dailyAmount={""}
              />
            }
          />
          <Route path="/business" element={<BusinessCreate />} />;
          <Route path="/*" element={<Navigate to="/dashboard" />} />
        </Routes>
      );
    } else {
      return (
        <Routes>
          <Route
            path="/listbusiness"
            element={
              <ListBusiness
                name={""}
                phone={""}
                email={""}
                address={""}
                BusinessCategory={""}
                Image={""}
                touched={""}
              />
            }
          />
          <Route path="/business" element={<BusinessCreate />} />;
          <Route path="/*" element={<Navigate to="/listbusiness" />} />
        </Routes>
      );
    }
  } else {
    return (
      <Routes>
        <Route path="/login" element={<FormLogin />} />
        <Route path="/register" element={<FormRegister />} />
        <Route path="/*" element={<Navigate to="/login" />} />
      </Routes>
    );
  }
};
