import { useLocation } from "react-router-dom";
import "./Footer.css"; // Create this CSS file for any custom styles

function Footer() {
  const location = useLocation();
  if (localStorage.getItem("role") == "admin") {
    return null;
  }

  if (location.pathname == "/login" || location.pathname == "/signup") {
    return null;
  }
  return (
    <footer className="bg-success text-white text-center py-3">
      <div className="container">
        <p className="mb-0">
          © {new Date().getFullYear()} FurniNest. All rights reserved.
        </p>

        <div>
          <a href="#" className="text-white me-3">
            Facebook
          </a>
          <a href="#" className="text-white me-3">
            Twitter
          </a>
          <a href="#" className="text-white">
            Instagram
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
