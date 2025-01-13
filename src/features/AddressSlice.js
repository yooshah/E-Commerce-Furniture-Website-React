import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstane from "../api/axiosInstance";
import { endPoints } from "../api/endPoints";

export const addDeliverAddress = createAsyncThunk(
  "deliveryAddress/addDeliverAddress",
  async (addressData, { rejectWithValue }) => {
    try {
      const response = await axiosInstane.post(
        endPoints.DELIVERYADDRESS.ADD_ADDRESS,
        addressData
      );

      return { ...addressData, id: response.data.data };
    } catch (error) {
      if (error.status == 422) {
        return rejectWithValue(error.response.data);
      }
    }
  }
);

export const fetchDeliveryAddress = createAsyncThunk(
  "deliveryAddress/deliveryAddress",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstane.get(
        endPoints.DELIVERYADDRESS.GET_ADDRESS
      );

      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.data.message);
    }
  }
);

export const deleteDeliveryAddress = createAsyncThunk(
  "deliveryAddress/deleteDeliveryAddress",
  async (deleteId, { rejectWithValue }) => {
    try {
      const response = await axiosInstane.delete(
        endPoints.DELIVERYADDRESS.REMOVE_ADDRESS(deleteId)
      );
      console.log(response);
      return deleteId;
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response);
      }
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  addressList: [],
  error: null,
  loading: false,
  addressIndex: null,
};

const addressSlice = createSlice({
  name: "deliveryAddress",
  initialState,
  reducers: {
    selectAddress(state, action) {
      state.addressIndex = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDeliveryAddress.pending, (state) => {
        state.error = null;
        state.loading = true;
      })
      .addCase(fetchDeliveryAddress.fulfilled, (state, action) => {
        state.addressList = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchDeliveryAddress.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(addDeliverAddress.pending, (state) => {
        state.error = null;
        state.loading = true;
      })
      .addCase(addDeliverAddress.fulfilled, (state, action) => {
        state.addressList.push(action.payload);
        state.loading = false;
        state.error = null;
      })
      .addCase(addDeliverAddress.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(deleteDeliveryAddress.pending, (state) => {
        state.error = null;
        state.loading = true;
      })
      .addCase(deleteDeliveryAddress.fulfilled, (state, action) => {
        state.addressList = state.addressList.filter(
          (item) => item.id !== action.payload
        );
        state.loading = false;
        state.error = null;
      })
      .addCase(deleteDeliveryAddress.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export const { selectAddress } = addressSlice.actions;

export default addressSlice.reducer;
