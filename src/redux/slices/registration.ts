import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { RegistrationInterface } from "@/interfaces/userInterface";

const initialState = {
  isLoading: false,
  isError: false,
};

export const signUp = createAsyncThunk("signUpSlice/signUp", async (values: RegistrationInterface) => {
  try {
    const { data } = await axios.post("https://679a16d8747b09cdcccda4e1.mockapi.io/api/users", values);
    return data;
  } catch {
    return "Unknown error";
  }
});

export const getUserByEmail = createAsyncThunk("signUpSlice/getUserByEmail", async (email: string) => {
  try {
    const { data } = await axios.get(`https://679a16d8747b09cdcccda4e1.mockapi.io/api/users?email=${email}`);
    return data;
  } catch {
    return "email not found";
  }
});

const signUpSlice = createSlice({
  name: "signUp",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(signUp.fulfilled, (state) => {
      state.isLoading = false;
    });
    builder.addCase(signUp.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(signUp.rejected, (state) => {
      state.isError = true;
    });
    builder.addCase(getUserByEmail.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getUserByEmail.fulfilled, (state) => {
      state.isLoading = false;
    });
  },
});

export const signUpReducer = signUpSlice.reducer;
