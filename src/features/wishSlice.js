import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstane from "../api/axiosInstance";
import { endPoints } from "../api/endPoints";
import { accordionActionsClasses } from "@mui/material";

export const AddToWishList = createAsyncThunk(
  "wish/AddToWishList",
  async (productId, { rejectWithValue }) => {
    try {
      const response = await axiosInstane.post(
        endPoints.WISHLIST.ADD_TO_WISHLIST(productId)
      );

      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }
);

export const fetchWishlistItems = createAsyncThunk(
  "wish/fetchWishlistItems",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstane.get(
        endPoints.WISHLIST.GET_USER_WISHLIST
      );
      console.log(response.data.data);
      return response.data.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const removeWishItem = createAsyncThunk(
  "/wish/removeWishItem",
  async (productId, { rejectWithValue }) => {
    try {
      const response = await axiosInstane.delete(
        endPoints.WISHLIST.REMOVE_ITEM(productId)
      );
      return productId;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const initialState = {
  wishList: [],
  error: null,
  loading: false,
};

const wishSlice = createSlice({
  name: "wish",
  initialState,

  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWishlistItems.pending, (state) => {
        state.error = null;
        state.loading = true;
      })
      .addCase(fetchWishlistItems.fulfilled, (state, action) => {
        state.wishList = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchWishlistItems.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(removeWishItem.pending, (state) => {
        state.error = null;
        state.loading = true;
      })
      .addCase(removeWishItem.fulfilled, (state, action) => {
        state.wishList = state.wishList.filter(
          (item) => item.productId != action.payload
        );
        state.loading = false;
        state.error = null;
      })
      .addCase(removeWishItem.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export default wishSlice.reducer;
