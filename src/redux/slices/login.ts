import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { LoginDataInterface } from "@/interfaces/userInterface";

const initialState = {
  isLoading: false,
  isError: false,
  userData: [],
  isLogin: false,
};

export const login = createAsyncThunk("loginSlice/login", async (values: LoginDataInterface) => {
  try {
    const { data } = await axios.get(`https://679a16d8747b09cdcccda4e1.mockapi.io/api/users?email=${values.email}&password=${values.password}`);
    return data;
  } catch {
    return "email or password is not correct";
  }
});

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    userLogin: (state) => {
      if (localStorage.getItem("userId")) {
        state.isLogin = true;
      } else {
        state.isLogin = false;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.isLoading = false;
      state.userData = action.payload;
    });
  },
});

export const loginReducer = loginSlice.reducer;
export const { userLogin } = loginSlice.actions;
