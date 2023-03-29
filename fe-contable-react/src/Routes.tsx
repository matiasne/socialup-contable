import { ListItem } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import { ProtectedRoutes } from "./auth/guards/authProvider";
import ListaProductos from "./features/products/components/itemProduct/itemProduct";
import { BoxCreate } from "./pages/createBox/create-box.page";
import { SaleCreate } from "./pages/createSale/create-sale.page";
import { FormForgotPassword } from "./pages/forgot-password/form-forgotpassword";
import { FormLogin } from "./pages/formLogin/formLogin";
import { FormProfile } from "./pages/formProfile/formProfile";
import { FormRegister } from "./pages/formRegister/formRegister";

const productos = [
  {
    nombre: "Producto 1",
    descripcion: "Descripción del producto 1",
    precio: 10.0,
  },
  {
    nombre: "Producto 2",
    descripcion: "Descripción del producto 2",
    precio: 20.0,
  },
  {
    nombre: "Producto 3",
    descripcion: "Descripción del producto 3",
    precio: 30.0,
  },
];

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
      <Route
        path="/products"
        element={<ListaProductos productos={productos} />}
      />
      <Route path="/profile" element={<FormProfile />} />
    </Routes>
  );
};
