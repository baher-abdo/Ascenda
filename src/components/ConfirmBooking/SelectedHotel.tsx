import { Card, CardContent, CardFooter, CardHeader } from "../../components/ui/card";
import Rating from "../HotelsPage/Rating";
import { FaLocationDot } from "react-icons/fa6";
import { ReactElement, useEffect } from "react";
import { MdLocalParking } from "react-icons/md";
import { RiSafe2Fill } from "react-icons/ri";
import { MdRoomService } from "react-icons/md";
import { IoIosWifi } from "react-icons/io";
import { storeDispatch } from "@/redux/store";
import { useDispatch } from "react-redux";
import { singleHotel } from "../../redux/slices/hotelsSlice";
import { HotelInterface } from "@/interfaces/hotelInterface";

const icons: { icon: ReactElement; name: string }[] = [
  {
    name: "Free Wi-Fi",
    icon: <IoIosWifi className="text-main-color" size={20} />,
  },
  {
    name: "Room Service",
    icon: <MdRoomService className="text-main-color" size={20} />,
  },
  {
    name: "Safe",
    icon: <RiSafe2Fill className="text-main-color" size={20} />,
  },
  {
    name: "Parking Garage",
    icon: <MdLocalParking className="text-main-color" size={20} />,
  },
];

export function SelectedHotel({ hotelId, singleHotelData }: { hotelId: number; singleHotelData: HotelInterface }) {
  const dispatch = useDispatch<storeDispatch>();
  useEffect(() => {
    dispatch(singleHotel(hotelId));
  }, []);

  return (
    <Card className="w-full md:flex xl:flex-col xl:w-[350px] col-span-2">
      <CardHeader className="p-0 overflow-hidden h-48 rounded-md">
        <img className="w-full h-full object-cover" src={singleHotelData?.images?.cover} alt="img" draggable="false" />
      </CardHeader>
      <CardContent className="px-6 py-4 space-y-3">
        <h5 className="font-bold h5 capitalize">{singleHotelData?.name?.split(" ").slice(0, 4).join(" ").toLocaleLowerCase()}</h5>
        <Rating rating={singleHotelData?.stars || 0} />
        <div className="flex items-center space-x-1">
          <FaLocationDot size={20} className="text-main-color" />
          <p className="text-xs text-gray-600">{singleHotelData?.location?.address}</p>
        </div>
        <div className="flex items-center space-x-1">
          <span className="py-1 px-2 bg-green-600 text-sm rounded-md text-white">{singleHotelData?.rating}</span>
          <p className="text-xs text-gray-600">- {singleHotelData?.pleasant}</p>
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex flex-wrap gap-2">
          {icons.map((item) => {
            return (
              <div key={item.name} className="flex items-center space-x-1">
                {item.icon}
                <p className="text-xs text-gray-600">{item.name}</p>
              </div>
            );
          })}
        </div>
      </CardFooter>
    </Card>
  );
}
