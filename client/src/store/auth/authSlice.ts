import jwt_decode from "jwt-decode";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import produce from "immer";
import authService from "./authService";

// GET User from LocalStorage
const user = JSON.parse(localStorage.getItem("user") || "{}");
const initialState = {
  isLogged: user.access_token ? true : false,
  isAdmin: user.isAdmin ? user.isAdmin : false,
  isError: false,
  isSuccess: false,
  isLoading: false,
  isLoginSuccess: false,
  message: "",
  darkTheme: false,
  username: user.username ? user.username : "",
};

// Login user
export const login = createAsyncThunk(
  "auth/login",
  async (user: { username: string; password: string }, thunkAPI) => {
    try {
      return await authService.login(user);
    } catch (error: any) {
      let message;
      if ([401, 400].includes(error.response.status)) {
        message = Object.values(error?.response?.data)[0];
      } else if ([500].includes(error?.response?.status)) {
        message = "Internal Server Error";
      } else {
        message = "Username or password is incorrect";
      }
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.isError = false;
      state.isLoginSuccess = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = "";
      state.darkTheme = false;
      state.username = "";
    },
    logout: (state) => {
      localStorage.removeItem("user");
      state.isLogged = false;
    },
    switchTheme: (state) => {
      produce(state, (draftState) => {
        state.darkTheme = !draftState.darkTheme;
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLoginSuccess = true;
        state.isLogged = true;
        const { isAdmin } = jwt_decode(action.payload.access_token) as any;
        state.isAdmin = isAdmin;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
        state.isLogged = false;
      });
  },
});

export const { reset, logout, switchTheme } = authSlice.actions;

export default authSlice.reducer;
