import { Outlet } from "react-router-dom";
import { NavBar } from "./NavBar";
import NavBarMenu from "./NavBarMenu";

export const RouterLayout = () => {
  return (
    <>
      <NavBarMenu />
      <NavBar />
      <Outlet />
    </>
  );
};
