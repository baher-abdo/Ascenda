import { useEffect, useState } from "react";
import MotionEffect from "../MotionEffect/MotionEffect";
import PriceRange from "./PriceRange";
import Row from "./Row";
import SearchByName from "./SearchByName";
import StarRating from "./StarRating";
import { HotelInterface } from "@/interfaces/hotelInterface";
import Loader from "../Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { storeDispatch, storeState } from "@/redux/store";
import { allHotels } from "../../redux/slices/hotelsSlice";
import SetScrollToUp from "../SetScrollToUp/SetScrollToUp";

export default function HotelsPage() {
  const { isLoading, hotelsData }: { isLoading: boolean; hotelsData: HotelInterface[] } = useSelector((state: storeState) => state.hotels);
  const dispatch = useDispatch<storeDispatch>();
  const [searchValue, setSearchValue] = useState<string>("");
  const [hotelStars, setHotelStars] = useState<number>(0);
  const [hotelPrice, setHotelPrice] = useState<number[]>([]);

  const hotelLocation = localStorage.getItem("bookingDetails");
  const parsedHotelLocation = hotelLocation && JSON.parse(hotelLocation)?.location;
  const filterResult = () => {
    return hotelsData
      .filter((hotel) => {
        if (hotelLocation && parsedHotelLocation !== "") {
          return hotelLocation && hotel?.location?.city === parsedHotelLocation;
        } else {
          return hotel;
        }
      })
      ?.filter((star: HotelInterface) => {
        return hotelStars === 0 ? star : star.stars === hotelStars;
      })
      ?.filter((name: HotelInterface) => {
        return searchValue.toLowerCase() === "" ? name : name.name?.toLowerCase().includes(searchValue);
      })
      ?.filter((price: HotelInterface) => {
        return hotelPrice.length > 0 ? price?.rooms?.[0]?.price?.perNight! > hotelPrice[0] && price?.rooms?.[0]?.price?.perNight! < hotelPrice?.[1]! : price;
      });
  };

  useEffect(() => {
    dispatch(allHotels());
  }, []);

  return (
    <section className="container py-16">
      {isLoading && <Loader />}
      <SetScrollToUp />
      <MotionEffect>
        <div className="grid xl:grid-cols-5 py-6 xl:space-x-6">
          <div className="col-span-5 xl:col-span-1">
            <div className="space-y-4 grid grid-cols-2 xl:grid-cols-1">
              <div className="col-span-2">
                <SearchByName value={setSearchValue || ""} />
              </div>
              <h3 className="title col-span-2">Filter results</h3>
              <div className="col-span-2 md:col-span-1 xl:col-span-2">
                <PriceRange
                  isLoading={isLoading}
                  setHotelPrice={setHotelPrice || []}
                  result={filterResult()
                    ?.map((price) => price?.rooms?.[0]?.price?.perNight)
                    .filter((price): price is number => price !== undefined)}
                />
              </div>
              <div className="col-span-2 md:col-span-1 xl:col-span-2">
                <StarRating
                  isLoading={isLoading}
                  setHotelStars={setHotelStars}
                  result={filterResult()
                    ?.map((stars) => stars?.stars)
                    .filter((star): star is number => star !== undefined)}
                />
              </div>
            </div>
          </div>
          <div className="col-span-4">
            <h4 className="title xl:my-0">
              {hotelLocation && parsedHotelLocation != "" ? parsedHotelLocation : "All"}: {filterResult().length} results found
            </h4>
            <div>
              {filterResult().map((hotel) => {
                return <Row key={hotel.id} {...hotel} />;
              })}
            </div>
          </div>
        </div>
      </MotionEffect>
    </section>
  );
}
