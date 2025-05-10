import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../features/productSlice";
import authReducer from "../features/AuthSlice";
import cartReducer from "../features/cartSlice";
import wishReducer from "../features/wishSlice";
import addressReducer from "../features/AddressSlice";
import orderReducer from "../features/orderSlice";
import userReducer from "../features/userSlice";

const store = configureStore({
  reducer: {
    product: productReducer,
    auth: authReducer,
    cart: cartReducer,
    wish: wishReducer,
    address: addressReducer,
    order: orderReducer,
    user: userReducer,
  },
});

export default store;
