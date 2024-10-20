import { useContext } from "react";
import { AdminContext } from "../../../Provider/AdminContext";
import "./Footer.css"; // Create this CSS file for any custom styles

function Footer() {
  const { checkAdmin } = useContext(AdminContext);

  if (checkAdmin) {
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
