import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import axiosInstane from "../api/axiosInstance";
import { endPoints } from "../api/endPoints";

const initialState = {
  products: [],
};

const instance = axios.create({
  baseURL: "http://localhost:5274",
});

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await instance.get("api/Product/GetAllProducts");
      console.log(response.data.data);
      return response.data.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const fetchProductByCategory = createAsyncThunk(
  "products/fetchProductByCategory",
  async (categoryId, { rejectWithValue }) => {
    try {
      const response = await axiosInstane.get(
        endPoints.PRODUCT.PRODUCT_BY_CATEGORY(categoryId)
      );
      console.log(response.data.data);
      return response.data.data;
    } catch (error) {
      if (error.response) {
        // console.log(error.response?.data?.message);
        return rejectWithValue(error.response?.data?.message);
      }
      return rejectWithValue(error.message);
    }
  }
);

export const fetchSearchProduct = createAsyncThunk(
  "products/fetchSearchProduct",
  async (searchWord, { rejectWithValue }) => {
    try {
      const response = await axiosInstane.get(
        endPoints.PRODUCT.SEARCH_PRODUCT(searchWord)
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
const productSlice = createSlice({
  name: "products",
  initialState,
  loading: false,
  error: null,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchProductByCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductByCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
        state.error = null;
      })
      .addCase(fetchProductByCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchSearchProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSearchProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
        state.error = null;
      })
      .addCase(fetchSearchProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default productSlice.reducer;
