import { BrowserRouter, Route, Routes } from "react-router";
import Layout from "./components/Layout/Layout";
import Home from "./components/Home/Home";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import BookingList from "./components/BookingList/BookingList";
import HotelsPage from "./components/HotelsPage/HotelsPage";
import HotelDetails from "./components/HotelDetails/HotelDetails";
import { store } from "./redux/store";
import { Provider } from "react-redux";
import ConfirmBooking from "./components/ConfirmBooking/ConfirmBooking";
import PageNotfound from "./components/UtilityPages/PageNotfound";
import UnderDevelopment from "./components/UtilityPages/UnderDevelopment";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="home" element={<Home />} />
            <Route path="bookings" element={<BookingList />} />
            <Route path="hotels" element={<HotelsPage />} />
            <Route path="registration" element={<Register />} />
            <Route path="details/:id" element={<HotelDetails />} />
            <Route path="conferm/:hotelId/:roomId" element={<ConfirmBooking />} />
            <Route path="login" element={<Login />} />
            <Route path="*" element={<PageNotfound />} />
            <Route path="services" element={<UnderDevelopment />} />
            <Route path="membership" element={<UnderDevelopment />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
