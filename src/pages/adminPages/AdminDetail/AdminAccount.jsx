import { useContext } from "react";
import { AdminContext } from "../../../Provider/AdminContext";
import "./AdminAccount.css";
function AdminAccount() {
  const { checkAdmin } = useContext(AdminContext);

  if (!checkAdmin) {
    return null;
  }
  return (
    <div className="container">
      <div className="d-flex justify-content-center align-items-center my-5">
        <div className="card" style={{ width: "18rem" }}>
          <h4 className="card-title">
            Furni<span className="text-success">Nest</span>
          </h4>
          <img
            className="card-img-top"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRy2LhCBbr-WMBMkbfNG7YnwCW16WZRtBwPNg&s"
            alt="Admin img"
          />
          <div className="card-body">
            <h5 className="card-title">{localStorage.getItem("name")}</h5>
            <p className="card-text">{localStorage.getItem("email")}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminAccount;
