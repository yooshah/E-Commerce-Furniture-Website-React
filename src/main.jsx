import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ProductProvider } from "./Provider/ProductContext.jsx";
import { AdminProvider } from "./Provider/AdminContext.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import App from "./App.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AdminProvider>
      <ProductProvider>
        <App />
      </ProductProvider>
    </AdminProvider>
  </StrictMode>
);
