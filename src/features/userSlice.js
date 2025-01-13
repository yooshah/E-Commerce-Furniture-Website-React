import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstane from "../api/axiosInstance";
import { endPoints } from "../api/endPoints";

export const getAllUsers = createAsyncThunk(
  "user/getAllUsers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstane.get(endPoints.USER.Get_All_USER);
      console.log(response.data);
      return response.data;
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue(error.message);
    }
  }
);

export const blockOrUnnblockUser = createAsyncThunk(
  "user/blockOrUnnblockUser",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axiosInstane.put(
        endPoints.USER.Block_AND_UNBLOCK(userId)
      );
      console.log(response);
      return response.data.data;
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue(error.message);
    }
  }
);

export const getUserOrderDetail = createAsyncThunk(
  "user/getUserOrderDetail",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axiosInstane.get(
        endPoints.ORDER.GET_USER_ORDER_BY_ADMIN(userId)
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

const initialState = {
  users: [],
  loading: false,
  error: null,
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllUsers.pending, (state) => {
        state.error = null;
        state.loading = true;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.users = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export default userSlice.reducer;
