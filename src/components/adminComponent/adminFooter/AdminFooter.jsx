import "./AdminFooter.css";
function AdminFooter() {
  if (location.pathname == "/login" || location.pathname == "/signup") {
    return null;
  }
  if (localStorage.getItem("role") == "user") {
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
