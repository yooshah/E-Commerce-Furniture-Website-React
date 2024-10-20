import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/userPages/SignUp&Login/Login.jsx";
import SignUp from "./pages/userPages/SignUp&Login/SignUp";
import Carts from "./pages/userPages/Cart/Cart.jsx";
import HomeDash from "./components/userComponent/userHome/HomeDash.jsx";
import NavBar from "./components/userComponent/userNavBar/NavBar.jsx";
import Footer from "./components/userComponent/userFooter/Footer.jsx";
import AdminHome from "./components/adminComponent/adminNavbar/AdminHome.jsx";
import "./App.css";
import Order from "./pages/userPages/Order/Order.jsx";
import OrderedItems from "./pages/userPages/Order/OrderedItems.jsx";
import Store from "./pages/userPages/store/Store.jsx";
import AdminProducts from "./pages/adminPages/ProductDetails/AdminProducts.jsx";
import UserDetails from "./pages/adminPages/UserDetails/UserDetails.jsx";
import AdminFooter from "./components/adminComponent/adminFooter/AdminFooter.jsx";
import AdminDashboard from "./pages/adminPages/AdminDashboard/AdminDashboard.jsx";
import AdminAccount from "./pages/adminPages/AdminDetail/AdminAccount.jsx";
import ProtectedRoute from "./pages/adminPages/AdminDetail/ProtectedRoute.jsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<HomeDash />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cart" element={<Carts />} />
          <Route path="/order" element={<Order />} />
          <Route path="/shipping" element={<OrderedItems />} />
          <Route path="/store" element={<Store />} />
        </Routes>
        <Footer />

        <AdminHome />
        <Routes>
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/webproducts"
            element={
              <ProtectedRoute>
                <AdminProducts />
              </ProtectedRoute>
            }
          />
          <Route
            path="/usersdetails"
            element={
              <ProtectedRoute>
                <UserDetails />
              </ProtectedRoute>
            }
          />
          <Route
            path="/adminaccount"
            element={
              <ProtectedRoute>
                <AdminAccount />
              </ProtectedRoute>
            }
          />
        </Routes>
        <AdminFooter />
      </BrowserRouter>
    </>
  );
}

export default App;
