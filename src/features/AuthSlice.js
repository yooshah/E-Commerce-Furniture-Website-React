import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import axiosInstane from "../api/axiosInstance";
import { endPoints } from "../api/endPoints";
import { Logout } from "@mui/icons-material";

export const checkAccount = createAsyncThunk(
  "auth/checkAccount",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:5274/api/Auth/Login",
        credentials
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

export const registerAccount = createAsyncThunk(
  "auth/registerAccount",
  async (registerData, { rejectWithValue }) => {
    console.log(
      "Register URL:",
      `${import.meta.env.VITE_BASE_URL}${endPoints.AUTH.REGISTER}`
    );
    try {
      const response = await axiosInstane.post(
        endPoints.AUTH.REGISTER,
        registerData
      );
      return response.data;
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response);
      }
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  user: null,
  isLoggedIn: false,
  registeruser: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  error: null,
  loading: false,
  reducers: {
    tokenLogin(state) {
      state.isLoggedIn = true;
    },
    logout(state) {
      state.isLoggedIn = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkAccount.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(checkAccount.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoggedIn = true;
        state.loading = false;
      })
      .addCase(checkAccount.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(registerAccount.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerAccount.fulfilled, (state, action) => {
        state.registeruser = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(registerAccount.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export const { logout, tokenLogin } = authSlice.actions;
export default authSlice.reducer;
