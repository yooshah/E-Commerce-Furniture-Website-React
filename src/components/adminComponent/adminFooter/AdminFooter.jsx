import { useContext } from "react";
import { AdminContext } from "../../../Provider/AdminContext";
import "./AdminFooter.css";
function AdminFooter() {
  const { checkAdmin } = useContext(AdminContext);

  if (!checkAdmin) {
    return null;
  }
  return (
    <footer className="admin-footer d-flex justify-content-between align-items-center p-3">
      <div>
        <p className="text-success mb-0">FurniNest © 2024</p>
      </div>
    </footer>
  );
}

export default AdminFooter;
