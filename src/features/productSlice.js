import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import axiosInstane from "../api/axiosInstance";
import { endPoints } from "../api/endPoints";

const initialState = {
  products: [],
  error: null,
  loading: false,
  anime: false,
  updatedProduct: null,
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

      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchProductById = createAsyncThunk(
  "products/fetchProductById",
  async (prdtId, { rejectWithValue }) => {
    try {
      const response = await axiosInstane.get(
        endPoints.PRODUCT.GET_PRODUCT_BY_ID(prdtId)
      );
      console.log(response.data.data);
      return response.data.data;
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue(error.message);
    }
  }
);

export const addNewPrduct = createAsyncThunk(
  "products/addNewPrduct",
  async (productData, { rejectWithValue }) => {
    try {
      const response = await axiosInstane.post(
        endPoints.PRODUCT.ADD_NEW_PRODUCT,
        productData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data.data;
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue(error.message);
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (DeleteId, { rejectWithValue }) => {
    try {
      const response = await axiosInstane.delete(
        endPoints.PRODUCT.DELETE_PRODUCT(DeleteId)
      );
      console.log(response);
      return DeleteId;
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue(error.message);
    }
  }
);

export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const response = await axiosInstane.put(
        endPoints.PRODUCT.UPDATE_PRODUCT(id),
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data.data);
      return response.data.data;
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue(error.message);
    }
  }
);

const productSlice = createSlice({
  name: "products",
  initialState,

  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.anime = false;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
        state.anime = true;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.anime = false;
      })
      .addCase(fetchProductByCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.anime = false;
      })
      .addCase(fetchProductByCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
        state.error = null;
        state.anime = false;
      })
      .addCase(fetchProductByCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.anime = false;
      })
      .addCase(fetchSearchProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.anime = false;
      })
      .addCase(fetchSearchProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
        state.error = null;
        state.anime = false;
      })
      .addCase(fetchSearchProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.anime = false;
      })
      .addCase(fetchProductById.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.anime = true;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.products = [action.payload];
        state.loading = false;
        state.error = null;
        state.anime = false;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
        state.anime = true;
      })
      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.products = state.products.filter(
          (item) => item.productId !== action.payload
        );
        state.loading = false;
        state.error = null;
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.updatedProduct = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export default productSlice.reducer;
