import { useDispatch, useSelector } from "react-redux";
import MotionEffect from "../MotionEffect/MotionEffect";
import SetScrollToUp from "../SetScrollToUp/SetScrollToUp";
import Row from "./Row";
import { storeDispatch, storeState } from "@/redux/store";
import { useEffect, useState } from "react";
import { getUserBookings } from "../../redux/slices/userBookings";
import Loader from "../Loader/Loader";
import { HotelReservationInterface } from "../../interfaces/hotelInterface";
export default function BookingList() {
  const { loading }: { loading: boolean } = useSelector((state: storeState) => state.bookings);

  const dispatch = useDispatch<storeDispatch>();
  const [userBookings, setUserBookings] = useState<HotelReservationInterface[]>([]);

  const userId: string | null = localStorage.getItem("userId");
  useEffect(() => {
    if (userId) {
      dispatch(getUserBookings(JSON.parse(userId).id)).then((res) => {
        setUserBookings(res.payload.bookings);
      });
    }
    localStorage.removeItem("bookingDetails");
  }, []);

  return (
    <section className={`container xl:px-36 py-8 xl:py-24 space-y-6 ${userBookings.length > 0 ? "self-start" : "self-center"}`}>
      {loading && <Loader />}
      <SetScrollToUp />
      <MotionEffect>
        {userBookings.length > 0 && (
          <div className="title pt-8 xl:pt-0">
            <h4 className="h4 text-main-color font-bold md:my-0">Your Bookings</h4>
          </div>
        )}
        {!userId ? (
          <h3 className="text-xl text-main-color font-bold text-center">Please sign in or create an account to view your bookings</h3>
        ) : (
          userBookings.length < 1 && <h3 className="text-xl text-main-color font-bold text-center">You haven't booked any hotels yet</h3>
        )}
        {userBookings.map((hotel: HotelReservationInterface, index: number) => {
          return <Row key={index} {...hotel} />;
        })}
      </MotionEffect>
    </section>
  );
}
