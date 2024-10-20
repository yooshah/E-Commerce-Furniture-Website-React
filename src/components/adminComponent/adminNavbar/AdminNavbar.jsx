import { useContext } from "react";
import { AdminContext } from "../../../Provider/AdminContext";
import "./AdminNavbar.css";

import Dropdown from "@mui/joy/Dropdown";
import Menu from "@mui/joy/Menu";
import MenuButton from "@mui/joy/MenuButton";
import MenuItem from "@mui/joy/MenuItem";
import Sidebar from "./SideBar";
import { useNavigate } from "react-router-dom";

function AdminNavbar() {
  const { handleLogout, checkAdmin } = useContext(AdminContext);
  const navigate = useNavigate();

  const handleClick = () => {
    handleLogout();
    navigate("./login");
  };
  if (!checkAdmin) {
    return null;
  }

  return (
    <nav className="navbar navbar-expand-lg admin-navbar">
      <div className="container-fluid">
        {/* Sidebar Toggle Button */}
        <Sidebar />

        {/* Brand */}
        <a className="navbar-brand logos d-flex align-items-center">
          <h2 className="px-5 mx-5">
            Furni<span className="text-success">Nest</span>
          </h2>
        </a>

        <div className="d-flex justify-content-end align-items-center"></div>
      </div>
      <div>
        <Dropdown>
          <MenuButton>
            <img
              src="src\pages\adminPages\assets\account_circle.svg"
              alt="login"
            />
          </MenuButton>
          <Menu>
            <MenuItem onClick={() => navigate("/adminaccount")}>
              Hi !{localStorage.getItem("name")}
            </MenuItem>
            {/* <MenuItem>My account</MenuItem> */}
            <MenuItem onClick={handleClick}>Logout</MenuItem>
          </Menu>
        </Dropdown>
      </div>
    </nav>
  );
}

export default AdminNavbar;
