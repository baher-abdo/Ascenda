import { configureStore } from "@reduxjs/toolkit";
import { signUpReducer } from "./slices/registration";
import { loginReducer } from "./slices/login";
import { hotelsReducer } from "./slices/hotelsSlice";
import { submitBookingsReducer } from "./slices/userBookings";

export const store = configureStore({
  reducer: {
    signUp: signUpReducer,
    signin: loginReducer,
    hotels: hotelsReducer,
    bookings: submitBookingsReducer,
  },
});
export type storeDispatch = typeof store.dispatch;
export type storeState = ReturnType<typeof store.getState>;
