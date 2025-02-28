import { FaLocationDot } from "react-icons/fa6";
import { Button } from "../ui/button";
import { IoWifi } from "react-icons/io5";
import { BiSwim } from "react-icons/bi";
import { TbAirConditioning } from "react-icons/tb";
import Rating from "./Rating";
import { HotelInterface } from "@/interfaces/hotelInterface";
import { Link } from "react-router";
import MotionEffect from "../MotionEffect/MotionEffect";
import { HoverCardDemo } from "./Reviews";
export default function Row(props: HotelInterface) {
  const { images, name, stars, reviews, rating, description, location, rooms, id } = props;
  return (
    <MotionEffect>
      <div className="card grid grid-cols-4 xl:pb-0 xl:space-x-5 rounded-md border border-gray-300 my-4 min-h-52 p-3">
        <div className="img col-span-4 xl:col-span-1 overflow-hidden rounded-md mb-3">
          <img src={images?.cover} alt="img" draggable="false" className="object-cover w-full h-52" />
        </div>
        <div className="text col-span-4 md:col-span-2 xl:mt-0 order-3 md:order-2 flex flex-col justify-between xl:pb-3">
          <div className="flex space-x-3 items-center">
            <p className="text-lg font-medium capitalize">{name}</p>
            <div>
              <span className="py-1 px-2 bg-green-600 text-sm rounded-md text-white">{rating}</span>
            </div>
          </div>
          <div className="rating flex flex-col items-start my-2">
            <div className="flex items-center space-x-2">
              <div>
                <Rating rating={stars || 0} />
              </div>
              <div className="flex items-center space-x-1">
                <p className="text-sm font-light">{stars}</p>
                <HoverCardDemo reviews={reviews || [""]} />
              </div>
            </div>
          </div>
          <div className="description text-xs font-light">
            <p>
              {description && description[0].split(" ").slice(0, 25).join(" ")}
              <Link to={`/details/${id}`}>........more</Link>
            </p>
          </div>
          <div className="location my-2 flex items-center space-x-1">
            <FaLocationDot size={20} className="text-main-color" />
            <p className="text-xs font-light">{location?.address}</p>
          </div>
          <Link to={`/details/${id}`}>
            <Button className="px-12">Select</Button>
          </Link>
        </div>

        <div className="services col-span-4 md:col-span-2 xl:col-span-1 flex md:flex-col justify-between items-center md:items-end order2 md:order-3">
          <div className="flex space-x-2">
            <IoWifi className="text-[#F2994A]" size={24} />
            <BiSwim className="text-[#F2994A]" size={24} />
            <TbAirConditioning className="text-[#F2994A]" size={24} />
          </div>
          <div className="pricing">
            <p className="text-sm font-light">1 room 1 night</p>
            <h5 className="h5 font-medium text-second-color">${rooms && rooms[0]?.price?.perNight}</h5>
            <p className="text-sm font-light text-gray-400">Taxes incl.</p>
          </div>
        </div>
      </div>
    </MotionEffect>
  );
}
