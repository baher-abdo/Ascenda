import Header from "../Header/Header";
import FilterBar from "../FilterBar/FilterBar";
import MotionEffect from "../MotionEffect/MotionEffect";
import { Link } from "react-router";
import { useEffect } from "react";
import { HotelInterface } from "../../interfaces/hotelInterface";
import Loader from "../Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { storeDispatch, storeState } from "@/redux/store";
import { allHotels } from "../../redux/slices/hotelsSlice";
import SetScrollToUp from "../SetScrollToUp/SetScrollToUp";

export default function Home() {
  const { isLoading, hotelsData } = useSelector((state: storeState) => state.hotels);
  const dispatch = useDispatch<storeDispatch>();

  useEffect(() => {
    dispatch(allHotels());
  }, []);

  return (
    <main className="bg-white w-full">
      {isLoading && <Loader />}
      <SetScrollToUp />
      <Header />
      <section className="container">
        <FilterBar />
        <MotionEffect>
          <div className="pb-16 grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 gap-10">
            <div className="col-span-full">
              <h3 className="title relative after-title">Top Rated</h3>
            </div>
            {hotelsData
              ?.filter((hotel: HotelInterface) => (hotel.rating ?? 0) > 7.8)
              .slice(0, 10)
              .map((hotel: HotelInterface) => {
                return (
                  <Link to={`/details/${hotel.id}`} key={hotel.id} className="w-full mx-auto overflow-hidden">
                    <div className="relative h-48 overflow-hidden group rounded-md">
                      <div className="absolute inset-0 z-10 bg-popover opacity-0 transition-opacity duration-300 group-hover:opacity-25"></div>
                      <img className="w-full h-48 object-cover rounded-md transition-transform duration-300 group-hover:scale-110" src={hotel.images?.cover} alt="Room Image" draggable="false" />
                    </div>
                    <div className="p-2">
                      <h2 className="text-md font-bold text-main-color capitalize">{hotel.name?.split(" ").slice(0, 3).join(" ").toLowerCase()}</h2>
                      <p className="text-gray-600 mt-1">
                        <span className="font-bold text-sm text-second-color">
                          ${hotel.rooms?.[0]?.price?.perNight}
                          <span className="font-normal text-xs"> / Night</span>
                        </span>
                      </p>
                      <p className="text-xs font-normal text-gray-500">{hotel.location?.address}</p>
                    </div>
                  </Link>
                );
              })}
          </div>
        </MotionEffect>
      </section>
    </main>
  );
}
