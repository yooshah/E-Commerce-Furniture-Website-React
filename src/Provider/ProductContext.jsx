import { createContext, useState, useEffect } from "react";
import axios from "axios";
/* eslint-disable react/prop-types */
const ProductContext = createContext();
function ProductProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [initialCartItems, setInitialCartItems] = useState([]);
  const [orderItems, setOrderItems] = useState([]);
  const [amount, setAmount] = useState(0);
  const [filterItems, setFilterItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/products");
        setProducts(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const userLogin = (data) => {
    setUser(data);
  };

  const logOut = () => {
    setUser(null);
    localStorage.removeItem("userId");
    localStorage.removeItem("email");
    localStorage.removeItem("userName");
    localStorage.removeItem("admin");
    setInitialCartItems([]);
  };

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    const email = localStorage.getItem("email");
    const admin = localStorage.getItem("admin");

    if (userId && email && admin == "false") {
      setUser({ userId, email });
    }
  }, []);

  useEffect(() => {
    const fetchCart = async () => {
      if (!user || !user.userId) return;

      try {
        const response = await axios.get(
          `http://localhost:5000/cart?userId=${user.userId}`
        );

        setInitialCartItems(response.data);
      } catch (err) {
        console.error("Fetching cart API Error:", err);
      }
    };

    fetchCart();
  }, [user]);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const OrderResponse = await axios.get(
          `http://localhost:5000/order?userId=${user.userId}`
        );

        setOrderItems(OrderResponse.data);
      } catch (err) {
        console.error("Fetched order error", err);
      }
    };
    fetchOrder();
  }, [user]);

  useEffect(() => {});

  return (
    <ProductContext.Provider
      value={{
        products,
        loading,
        error,
        userLogin,
        user,
        initialCartItems,
        setInitialCartItems,
        logOut,
        orderItems,
        setOrderItems,
        amount,
        setAmount,
        filterItems,
        setFilterItems,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export { ProductContext, ProductProvider };
