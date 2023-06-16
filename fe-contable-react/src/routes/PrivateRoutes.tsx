import { Navigate, Outlet } from "react-router-dom";
import { getSessionBusiness, getSessionServices } from "../auth/services/authService";

export const PrivateRoute = () => {
  const session = getSessionServices();
  const business = getSessionBusiness();
  console.log(session);
  console.log (business)

  if (!session){
    return <Navigate to="/login" />
  }else{
    if (!business){
     return <Navigate to="/listbusiness"/>
    }else {
      return <Navigate to="/dashboard"/>
    }
  }
  
};


//<Navigate to="/listbusiness"/>