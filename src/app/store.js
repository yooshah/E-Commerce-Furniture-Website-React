import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../features/productSlice";
import authReducer from "../features/AuthSlice";
import cartReducer from "../features/cartSlice";

const store = configureStore({
  reducer: {
    product: productReducer,
    auth: authReducer,
    cart: cartReducer,
  },
});

export default store;
