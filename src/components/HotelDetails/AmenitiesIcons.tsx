import { MdOutlineRoomService } from "react-icons/md";
import { BiSwim } from "react-icons/bi";
import { MdOutlineFreeBreakfast } from "react-icons/md";
import { LiaGlassMartiniAltSolid } from "react-icons/lia";
import { MdOutlineCoffeeMaker } from "react-icons/md";
import { TbSmokingNo } from "react-icons/tb";
import { MdSpa } from "react-icons/md";
import { IoRestaurantSharp } from "react-icons/io5";
import { MdAirportShuttle } from "react-icons/md";
import { IoMdFitness } from "react-icons/io";
import { LuCircleParking } from "react-icons/lu";
import { FaWifi } from "react-icons/fa6";
import { TbBeach } from "react-icons/tb";
import { PiFlowerTulip } from "react-icons/pi";
import { MdOutlineSupportAgent } from "react-icons/md";
import { TbDisabled } from "react-icons/tb";

const AmenityIcons = {
  "Room Service": <MdOutlineRoomService className="amenities-icons-color" size={20} />,
  breakfast: <MdOutlineFreeBreakfast className="amenities-icons-color" size={20} />,
  bar: <LiaGlassMartiniAltSolid className="amenities-icons-color" size={20} />,
  coffee: <MdOutlineCoffeeMaker className="amenities-icons-color" size={20} />,
  "Non-smoking": <TbSmokingNo className="amenities-icons-color" size={20} />,
  Spa: <MdSpa className="amenities-icons-color" size={20} />,
  restaurant: <IoRestaurantSharp className="amenities-icons-color" size={20} />,
  shuttle: <MdAirportShuttle className="amenities-icons-color" size={20} />,
  Fitness: <IoMdFitness className="amenities-icons-color" size={20} />,
  parking: <LuCircleParking className="amenities-icons-color" size={20} />,
  swimming: <BiSwim className="amenities-icons-color" size={20} />,
  wifi: <FaWifi className="amenities-icons-color" size={20} />,
  beach: <TbBeach className="amenities-icons-color" size={20} />,
  garden: <PiFlowerTulip className="amenities-icons-color" size={20} />,
  "front desk": <MdOutlineSupportAgent className="amenities-icons-color" size={20} />,
  disabled: <TbDisabled className="amenities-icons-color" size={20} />,
};

export const getAmenityIcon = (amenity: string) => {
  const entry = Object.entries(AmenityIcons).find(([key]) => amenity.toLowerCase().includes(key.toLowerCase()));

  return entry ? entry[1] : null;
};

export default getAmenityIcon;
