import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstane from "../api/axiosInstance";
import { endPoints } from "../api/endPoints";

export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstane.get(endPoints.CART.GET_USER_CART);
      return response.data.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const initialState = {
  cart: [],
};
const cartSlice = createSlice({
  name: "cart",
  initialState,
  error: null,

  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.cart = action.payload;
        state.error = null;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.cart = [];
        state.error = action.payload;
      });
  },
});

export default cartSlice.reducer;
