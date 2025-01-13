import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstane from "../api/axiosInstance";
import { endPoints } from "../api/endPoints";

export const fetchUserOrder = createAsyncThunk(
  "order/fetchUserOrder",

  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstane.get(endPoints.ORDER.GET_USER_ORDERS);

      // console.log(response);
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

export const changeDeliveryStatus = createAsyncThunk(
  "order/changeDeliveryStatus",
  async ({ orderId, deliveryStatus }, { rejectWithValue }) => {
    try {
      const response = await axiosInstane.patch(
        endPoints.ORDER.CHANGE_ORDER_STATUS(orderId, deliveryStatus)
      );
      console.log(response);
      return response.data;
    } catch (error) {
      if (error.response) {
        // console.log(error.response?.data?.message);
        return rejectWithValue(error.response?.data?.message);
      }
      return rejectWithValue(error.message);
    }
  }
);

export const getTotalRevenue = createAsyncThunk(
  "order/getTotalRevenue",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstane.get(endPoints.ORDER.TOTAL_REVENUE);
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
export const fetchRevenueRecord = createAsyncThunk(
  "order/fetchRevenueRecord",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstane.get(
        endPoints.ORDER.GET_REVENUE_RECORD
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

export const fetchOrderById = createAsyncThunk(
  "order/fetchOrderById",
  async (orderId, { rejectWithValue }) => {
    try {
      const response = await axiosInstane.get(
        endPoints.ORDER.GET_ORDER_LIST_BY_ID(orderId)
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);
const initialState = {
  order: [],
  error: null,
  loading: false,
  revenue: 0,
  totalProductSold: 0,
  revenueRecord: null,
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserOrder.fulfilled, (state, action) => {
        state.order = action.payload;
        state.error = null;
        state.loading = false;
      })
      .addCase(fetchUserOrder.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(getTotalRevenue.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTotalRevenue.fulfilled, (state, action) => {
        state.revenue = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(getTotalRevenue.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchRevenueRecord.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRevenueRecord.fulfilled, (state, action) => {
        state.revenueRecord = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchRevenueRecord.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export default orderSlice.reducer;
