import { FaLocationDot } from "react-icons/fa6";
import Rating from "../HotelsPage/Rating";
import { Button } from "../ui/button";
import { Separator } from "@radix-ui/react-separator";
import { Link } from "react-router";
import { HotelReservationInterface } from "../../interfaces/hotelInterface";

export default function Row(props: HotelReservationInterface) {
  const { image, hotelId, name, stars, address, reviews, rating, checkIn, checkOut, rooms, price } = props;
  const totalNights = () => Number((new Date(checkOut).getTime() - new Date(checkIn).getTime()) / 1000 / 60 / 60 / 24);

  return (
    <div className="bg-white xl:p-5">
      <div className="card grid grid-cols-4 md:space-x-5 rounded-md shadow-md p-2">
        <div className="col-span-4 xl:col-span-1">
          <img src={image} alt="img" draggable="false" className="object-cover w-full h-52" />
        </div>
        <div className="flex flex-col justify-between space-y-3 col-span-4 md:col-span-2 mt-3 xl:mt-0">
          <div>
            <p className="text-lg font-medium capitalize">{name?.split(" ")?.slice(0, 4)?.join(" ")}</p>
            <Rating rating={stars} />
          </div>
          <div className="location flex items-center space-x-1">
            <FaLocationDot size={20} className="text-main-color" />
            <p className="text-xs font-light">{address}</p>
          </div>
          <div className="rating flex items-center space-x-1">
            <span className="py-1 px-2 bg-green-600 text-sm rounded-md text-white">{rating}</span>
            <p className="text-sm font-light"> - {reviews}</p>
          </div>
          <div className="flex items-center justify-start space-x-4 text-sm">
            <div className="space-y-1">
              <p>Check-in</p>
              <h5 className="h5 font-medium">{checkIn}</h5>
              <p className="text-gray-400">From 02:00 PM</p>
            </div>
            <Separator orientation="vertical" className="h-14 w-[1px] bg-gray-300" />
            <div className="space-y-1">
              <p>Check-out</p>
              <h5 className="h5 font-medium">{checkOut}</h5>
              <p className="text-gray-400">Until 02:00 PM</p>
            </div>
          </div>
        </div>
        <div className="services col-span-4 md:col-span-2 xl:col-span-1 flex md:flex-col justify-between items-end md:items-end  mt-3 xl:mt-0">
          <div className="flex space-x-2 md:order-2">
            <Link to={`/details/${hotelId}`}>
              <Button className="md:px-12 bg-blue-600 hover:bg-blue-500">View Details</Button>
            </Link>
          </div>
          <div className="pricing text-end md:order-1">
            <p className="text-sm font-light">
              {rooms} room {totalNights()} night
            </p>
            <h5 className="h5 font-bold text-yellow-400">$ {totalNights() * rooms * price + 120}</h5>
            <p className="text-sm font-light text-gray-400">Taxes incl.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
