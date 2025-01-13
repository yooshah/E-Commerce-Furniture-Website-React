import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useSelector } from "react-redux";

/* eslint-disable react/prop-types */
function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  // const { checkAdmin, isLoading } = useContext(AdminContext);
  const { isLoggedIn, loading } = useSelector((state) => state.auth);
  useEffect(() => {
    if (localStorage.getItem("role") != "admin") {
      navigate("/login");
    }
  }, [navigate, loading, isLoggedIn]);
  return isLoggedIn && localStorage.getItem("role") == "admin"
    ? children
    : null;
}

export default ProtectedRoute;

// export default ProtectedRoute;
// import { useEffect, useContext } from "react";
// import { useNavigate } from "react-router-dom";
// import { AdminContext } from "../../../Provider/AdminContext";

// /* eslint-disable react/prop-types */
// function ProtectedRoute({ children }) {
//   const navigate = useNavigate();
//   const { checkAdmin, isLoading } = useContext(AdminContext);
//   useEffect(() => {
//     if (!isLoading && !checkAdmin) {
//       navigate("/login");
//     }
//   }, [checkAdmin, navigate, isLoading]);
//   return checkAdmin ? children : null;
// }

// export default ProtectedRoute;
