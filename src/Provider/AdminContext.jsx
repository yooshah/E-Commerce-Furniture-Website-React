import { createContext, useEffect, useState } from "react";

/* eslint-disable react/prop-types */
const AdminContext = createContext();

function AdminProvider({ children }) {
  const [checkAdmin, setCheckAdmin] = useState(false);
  const [admin, setAdmin] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const adminLogin = (data) => {
    setAdmin(data);
  };
  useEffect(() => {
    const adminId = localStorage.getItem("adminId");
    const email = localStorage.getItem("email");
    const name = localStorage.getItem("name");
    const localadmin = localStorage.getItem("admin");

    if (localadmin == "true") {
      setAdmin({ adminId, email, name, admin });
      setCheckAdmin(true);
      setIsLoading(false);
    } else {
      setCheckAdmin(false);
      setIsLoading(false);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("AdminId");
    localStorage.removeItem("email");
    localStorage.removeItem("admin");
    localStorage.removeItem("name");
    setCheckAdmin(false);
    // navigate("/login");
  };

  return (
    <AdminContext.Provider
      value={{
        checkAdmin,
        setCheckAdmin,
        admin,
        setAdmin,
        adminLogin,
        handleLogout,
        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}

export { AdminProvider, AdminContext };
