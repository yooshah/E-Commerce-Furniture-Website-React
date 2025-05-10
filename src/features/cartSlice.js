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
      const response = await axiosInstane.post(
        endPoints.CART.ADD_TO_CART(productId)
      );
      console.log(response.data);

      if (response.status == 200) return response.data;
      if (response.status == 208) return null;
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

export const IncreseQuatinty = createAsyncThunk(
  "cart/IncreseQuatinty",
  async (cartItemId, { rejectWithValue }) => {
    try {
      const response = await axiosInstane.patch(
        endPoints.CART.INCREASE_QUANTITY(cartItemId)
      );
      if (response.data.data) {
        return cartItemId;
      }
    } catch (error) {
      console.log(error.response.data.message);

      if (error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      }
      return rejectWithValue(error.message);
    }
  }
);

export const DecreaseQuantity = createAsyncThunk(
  "cart/DecreaseQuantity",
  async (cartItemId, { rejectWithValue }) => {
    try {
      const resposnse = await axiosInstane.patch(
        endPoints.CART.DECREASE_QUANTITY(cartItemId)
      );
      if (resposnse.data) {
        return cartItemId;
      }
    } catch (error) {
      if (error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      }
      return rejectWithValue(error.message);
    }
  }
);
const initialState = {
  cart: [],
  error: null,
  loading: false,
};
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    cartCleaner(state) {
      state.cart = [];
    },
  },

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
      })
      .addCase(IncreseQuatinty.pending, (state) => {
        state.error = null;
        state.loading = true;
      })
      .addCase(IncreseQuatinty.fulfilled, (state, action) => {
        const cartItem = state.cart.find((x) => x.cartItemId == action.payload);
        cartItem.quantity++;
        state.loading = false;
        state.error = null;
      })
      .addCase(IncreseQuatinty.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(DecreaseQuantity.pending, (state) => {
        state.error = null;
        state.loading = true;
      })
      .addCase(DecreaseQuantity.fulfilled, (state, action) => {
        const cartItem = state.cart.find((x) => x.cartItemId == action.payload);
        cartItem.quantity--;
        state.loading = false;
        state.error = null;
      })
      .addCase(DecreaseQuantity.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(AddToCart.pending, (state) => {
        state.error = null;
        state.loading = true;
      })
      .addCase(AddToCart.fulfilled, (state, action) => {
        if (action.payload !== null) {
          state.cart.push(action.payload);
        }
        state.loading = false;
        state.error = null;
      })
      .addCase(AddToCart.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export const { cartCleaner } = cartSlice.actions;
export default cartSlice.reducer;
