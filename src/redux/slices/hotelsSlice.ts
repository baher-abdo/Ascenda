import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  isError: false,
  hotelsData: [],
  singleHotelData: [],
};

export const allHotels = createAsyncThunk("hotelsSlice/allHotels", async () => {
  try {
    const { data } = await axios.get(`https://679a16d8747b09cdcccda4e1.mockapi.io/api/booking`);
    return data;
  } catch {
    return "Unknown error";
  }
});

export const singleHotel = createAsyncThunk("hotelsSlice/singleHotel", async (id: number) => {
  try {
    const { data } = await axios.get(`https://679a16d8747b09cdcccda4e1.mockapi.io/api/booking?id=${id}`);
    return data;
  } catch {
    return "Unknown error";
  }
});

const loginSlice = createSlice({
  name: "hotelsDetails",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(allHotels.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(allHotels.fulfilled, (state, action) => {
      state.isLoading = false;
      state.hotelsData = action.payload;
    });
    builder.addCase(singleHotel.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(singleHotel.fulfilled, (state, action) => {
      state.isLoading = false;
      state.singleHotelData = action.payload;
    });
  },
});

export const hotelsReducer = loginSlice.reducer;
