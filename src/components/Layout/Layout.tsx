import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { Outlet } from "react-router";
import { useDispatch } from "react-redux";
import { Toaster } from "../ui/toaster";
import { useEffect } from "react";
import { userLogin } from "../../redux/slices/login";
import TrackPreviousRoute from "../Login/TrackPreviousRoute";
import DetectOffline from "../UtilityPages/DetectOffline";

export default function Layout() {
  const dispatch = useDispatch();
  function checkLogin() {
    if (localStorage.getItem("userId")) {
      dispatch(userLogin());
    }
  }
  useEffect(() => {
    checkLogin();
  }, []);
  return (
    <section className="bg-gray-100" key={Date.now()}>
      <TrackPreviousRoute />
      <Navbar />
      <div className="min-h-screen flex items-start justify-center w-full">
        <DetectOffline />
        <Outlet />
      </div>
      <Footer />
      <Toaster />
    </section>
  );
}
