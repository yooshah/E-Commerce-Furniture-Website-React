import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AdminContext } from "../../../Provider/AdminContext";

/* eslint-disable react/prop-types */
function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const { checkAdmin, isLoading } = useContext(AdminContext);
  useEffect(() => {
    if (!isLoading && !checkAdmin) {
      navigate("/login");
    }
  }, [checkAdmin, navigate, isLoading]);
  return checkAdmin ? children : null;
}

export default ProtectedRoute;
