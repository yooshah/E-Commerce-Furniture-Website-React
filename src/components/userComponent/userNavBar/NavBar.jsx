import "./NavBar.css";
import SearchBar from "./SearchBar";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { ProductContext } from "../../../Provider/ProductContext";
import { ToastContainer, toast } from "react-toastify";
import { useLocation } from "react-router-dom";
import { AdminContext } from "../../../Provider/AdminContext";

function NavBar() {
  const { user, initialCartItems, logOut, setFilterItems, products } =
    useContext(ProductContext);
  const { checkAdmin } = useContext(AdminContext);
  const navigate = useNavigate();

  const location = useLocation();

  const isHomePage = location.pathname === "/";

  const handleLogout = () => {
    logOut();
    toast.success("Logout");
    navigate("/");
    return;
  };
  const handleClick = () => {
    setFilterItems([]);
  };

  const handleCategory = (category) => {
    const catgorisedItem = products.filter((val) => val.category == category);
    setFilterItems(catgorisedItem);
  };

  const handleLogo = () => {
    setFilterItems([]);
    navigate("/");
  };

  let cartNumber = initialCartItems.length;
  
  if (cartNumber == 0) {
    cartNumber = null;
  }
  if (checkAdmin) {
    return null;
  }
  return (
    <>
      <div className="nav-offer">
        <ToastContainer /> Use code FLASH2000 for an instant ₹2000 discount! |{" "}
        <span className="">Shop Now.</span>
      </div>
      <nav className="navbar navbar-expand-md navbar-light bg-light navbarBox m-2">
        <div className="container-fluid">
          <a className="navbar-brand logos" onClick={handleLogo}>
            <h2>
              Furni<span className="text-success">Nest</span>
            </h2>
          </a>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <SearchBar />
            <ul className="navbar-nav ms-auto">
              <li className="nav-item nav-icons position-relative">
                <Link
                  to="/"
                  className="nav-link cart-icon "
                  aria-current="page"
                  onClick={handleClick}
                >
                  <img src="src\components\assets\home.svg" alt="home icon" />
                </Link>
              </li>
              <li className="nav-item nav-icons position-relative">
                <Link
                  to="/store"
                  className="nav-link cart-icon "
                  aria-current="page"
                  onClick={handleClick}
                >
                  <img src="src\components\assets\store.svg" alt="store icon" />
                </Link>
              </li>
              <li className="nav-item nav-icons position-relative">
                <Link
                  to="/cart"
                  className="nav-link cart-icon "
                  aria-current="page"
                  onClick={handleClick}
                >
                  <img
                    src="src\components\assets\shopping.svg"
                    alt="cart icon"
                  />
                  {cartNumber && (
                    <span className="position-absolute top-0 start-25 translate-middle badge rounded-pill bg-success">
                      {cartNumber}
                    </span>
                  )}
                </Link>
              </li>
              <li className="nav-item nav-icons position-relative">
                <Link
                  to="/shipping"
                  className="nav-link cart-icon "
                  aria-current="page"
                  onClick={handleClick}
                >
                  <img
                    src="src\components\assets\shipping.svg"
                    alt="shipping icon"
                  />
                </Link>
              </li>
              <li className="nav-item nav-icons position-relative">
                {user ? (
                  <div className="nav-link cart-icon " onClick={handleLogout}>
                    <img
                      src="src\components\assets\logout.svg"
                      alt="logout icon"
                    />
                  </div>
                ) : (
                  <div>
                    <Link
                      to="/login"
                      className="nav-link cart-icon "
                      aria-current="page"
                      onClick={handleClick}
                    >
                      <img
                        src="src\components\assets\person.svg"
                        alt="user icon"
                      />
                    </Link>
                  </div>
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {isHomePage && (
        <div className="menu-tab">
          <span onClick={() => handleCategory("Living")}>Living</span>
          <span onClick={() => handleCategory("Dining")}>Dining</span>
          <span onClick={() => handleCategory("Bedroom")}>Bedroom</span>
          <span onClick={() => handleCategory("Sofas")}>Sofas</span>
          <span onClick={() => handleCategory("Kitchen")}>Kitchen</span>
          <span onClick={() => handleCategory("Office")}>Office</span>
          <span onClick={() => handleCategory("New Arrivals")}>
            New Arrival
          </span>
        </div>
      )}
    </>
  );
}

export default NavBar;
