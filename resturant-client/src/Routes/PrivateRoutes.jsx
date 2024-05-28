import React, { useContext } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import Loader from "../Components/Loader";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoutes = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();
  if (loading) {
    return <Loader />;
  }
  if (user) {
    return children;
  }
  if (!user) {
    return <Navigate to="/login" state={location.pathname} replace={true} />;
  }
};

export default PrivateRoutes;
