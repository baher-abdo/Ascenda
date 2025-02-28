import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { HotelReservationInterface } from "../../interfaces/hotelInterface";
const initialState = {
  loading: false,
  isError: false,
  userBookings: [],
};

export const submitBookings = createAsyncThunk("submitBookings/submitBookingsSlice", async ({ id, bookings }: { id: string; bookings: HotelReservationInterface[] }) => {
  try {
    const { data } = await axios.put(`https://679a16d8747b09cdcccda4e1.mockapi.io/api/users/${id}`, { bookings });

    return data;
  } catch {
    return "Unknown error";
  }
});

export const getUserBookings = createAsyncThunk("submitBookingsSlice/getUserBookings", async (id: string) => {
  try {
    const { data } = await axios.get(`https://679a16d8747b09cdcccda4e1.mockapi.io/api/users/${id}`);
    return data;
  } catch {
    return "Unknown error";
  }
});

const submitBookingsSlice = createSlice({
  name: "submitBookings",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUserBookings.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getUserBookings.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(submitBookings.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(submitBookings.fulfilled, (state, action) => {
      state.loading = false;
      state.userBookings = action.payload;
    });
  },
});

export const submitBookingsReducer = submitBookingsSlice.reducer;
