import "./NavBar.css";
import SearchBar from "./SearchBar";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

import { ToastContainer } from "react-toastify";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { cartCleaner, fetchUserCart } from "../../../features/cartSlice";
import {
  fetchProductByCategory,
  fetchProducts,
} from "../../../features/productSlice";

import { tokenLogin, logout } from "../../../features/AuthSlice";

function NavBar() {
  const navigate = useNavigate();

  const location = useLocation();

  const { cart } = useSelector((state) => state.cart);

  const { isLoggedIn } = useSelector((state) => state.auth);

  console.log(isLoggedIn);

  const isHomePage = location.pathname === "/";
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      dispatch(tokenLogin());
    }

    dispatch(fetchUserCart());
  }, [dispatch]);
  const handleLogout = () => {
    dispatch(logout());
    dispatch(cartCleaner());
    localStorage.clear();
    setTimeout(() => navigate("/login"), 500);
    return;
  };

  const handleCategory = (categoryId) => {
    console.log(categoryId);
    try {
      dispatch(fetchProductByCategory(categoryId)).unwrap();
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogo = async () => {
    await dispatch(fetchProducts());
    navigate("/");
  };

  let cartNumber = cart.length;

  if (cartNumber == 0) {
    cartNumber = null;
  }

  if (localStorage.getItem("role") == "admin") {
    return null;
  }
  if (location.pathname == "/login" || location.pathname == "/signup") {
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
                >
                  <img src="src\components\assets\home.svg" alt="home icon" />
                </Link>
              </li>
              <li className="nav-item nav-icons position-relative">
                <Link
                  to="/store"
                  className="nav-link cart-icon "
                  aria-current="page"
                >
                  <img src="src\components\assets\store.svg" alt="store icon" />
                </Link>
              </li>
              <li className="nav-item nav-icons position-relative">
                <Link
                  to="/favorite"
                  className="nav-link cart-icon "
                  aria-current="page"
                >
                  <img
                    src="src\components\assets\favorite.svg"
                    alt="WishList icon"
                  />
                </Link>
              </li>
              <li className="nav-item nav-icons position-relative">
                <Link
                  to="/cart"
                  className="nav-link cart-icon "
                  aria-current="page"
                  // onClick={handleClick}
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
                  to="/orders"
                  className="nav-link cart-icon "
                  aria-current="page"
                  // onClick={handleClick}
                >
                  <img
                    src="src\components\assets\shipping.svg"
                    alt="shipping icon"
                  />
                </Link>
              </li>
              <li className="nav-item nav-icons position-relative">
                {isLoggedIn ? (
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
                      // onClick={handleClick}
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
          <span onClick={() => handleCategory(2)}>Living</span>
          <span onClick={() => handleCategory(4)}>Dining</span>
          <span onClick={() => handleCategory(3)}>Bedroom</span>
          <span onClick={() => handleCategory(1)}>Sofas</span>
          <span onClick={() => handleCategory(7)}>Kitchen</span>
          <span onClick={() => handleCategory(6)}>Office</span>
          <span onClick={() => handleCategory(5)}>New Arrival</span>
        </div>
      )}
    </>
  );
}

export default NavBar;
