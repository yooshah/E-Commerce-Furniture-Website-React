import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstane from "../api/axiosInstance";
import { endPoints } from "../api/endPoints";
import { logout } from "./AuthSlice";

export const fetchUserCart = createAsyncThunk(
  "cart/fetchUserCart",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstane.get(endPoints.CART.GET_USER_CART);
      console.log(response.data);
      return response.data.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const AddToCart = createAsyncThunk(
  "cart/AddToCart",
  async (productId, { dispatch, rejectWithValue }) => {
    try {
      let formData = new FormData();
      formData.append("productId", productId);
      console.log(formData);
      const response = await axiosInstane.post(
        endPoints.CART.ADD_TO_CART,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);

      return response.data;
    } catch (error) {
      console.log(error);
      if (error.response.status == 401) {
        dispatch(logout);
        return rejectWithValue(error.response);
      }

      return rejectWithValue(error.message);
    }
  }
);

export const DeleteCartItem = createAsyncThunk(
  "cart/DeleteCartItem",
  async (deleteId, { rejectWithValue }) => {
    try {
      const response = await axiosInstane.delete(
        endPoints.CART.DELETE_CART_ITEM(deleteId)
      );
      console.log(response.data);
      return deleteId;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);

const initialState = {
  cart: [],
};
const cartSlice = createSlice({
  name: "cart",
  initialState,
  loading: false,
  error: null,

  extraReducers: (builder) => {
    builder
      .addCase(fetchUserCart.fulfilled, (state, action) => {
        state.cart = action.payload;
        state.error = null;
        state.loading = false;
      })
      .addCase(fetchUserCart.rejected, (state, action) => {
        state.cart = [];
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(fetchUserCart.pending, (state) => {
        state.error = null;
        state.loading = true;
      })
      .addCase(DeleteCartItem.pending, (state) => {
        state.error = null;
        state.loading = true;
      })
      .addCase(DeleteCartItem.fulfilled, (state, action) => {
        state.cart = state.cart.filter(
          (item) => item.cartItemId != action.payload
        );
        state.loading = false;
      })
      .addCase(DeleteCartItem.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = true;
      });
  },
});

export default cartSlice.reducer;
