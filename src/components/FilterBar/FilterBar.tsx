import { FaLocationDot } from "react-icons/fa6";
import SelectLocation from "./SelectLocation";
import { DatePickerWithRange } from "./DateRange";
import { FaCalendar } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { PopoverDemo } from "./IdentifyRooms";
import { Button } from "../ui/button";
import { Link } from "react-router";
import { useState } from "react";
import { UserCheckInterface } from "../../interfaces/userInterface";

export default function FilterBar() {
  const [bookingDetails, setbookingDetails] = useState<UserCheckInterface>({
    location: "",
    from: "",
    to: "",
    adults: 0,
    children: 0,
    rooms: 0,
    night: 0,
  });
  const hotelBookingInfo = () => {
    localStorage.setItem("bookingDetails", JSON.stringify(bookingDetails));
  };

  const handleUpdate = (updates: Partial<UserCheckInterface>) => {
    setbookingDetails((prev) => ({
      ...prev,
      ...updates,
    }));
  };
  return (
    <div className="xl:w-10/12 -translate-y-1/4 xl:-translate-y-1/2 mx-auto py-4 bg-white shadow-md rounded-md grid grid-cols-8  space-y-4 md:space-y-0">
      <div className="col-span-8 md:col-span-2 flex flex-col md:items-center justify-center border-b-2 md:border-b-0">
        <div className="flex items-center md:justify-center flex-col xl:flex-row space-x-1">
          <FaLocationDot size={15} className="text-main-color" />
          <p className="text-xs text-main-color">Where are you headed?</p>
        </div>
        <div className="flex justify-center">
          <SelectLocation handleUpdate={handleUpdate} />
        </div>
      </div>
      <div className="col-span-8 md:col-span-2 flex flex-col items-center justify-center border-b-2 md:border-b-0 order-3 xl:order-2">
        <div className="flex  justify-around md:justify-between w-[200px] px-3">
          <div className="flex items-center md:justify-center flex-col xl:flex-row space-x-1">
            <FaCalendar size={15} className="text-main-color" />
            <p className="text-xs text-main-color">Check in</p>
          </div>
          <div className="flex items-center md:justify-center flex-col xl:flex-row space-x-1">
            <FaCalendar size={15} className="text-main-color" />
            <p className="text-xs text-main-color">Check out</p>
          </div>
        </div>
        <div className="flex justify-center">
          <DatePickerWithRange handleUpdate={handleUpdate} />
        </div>
      </div>
      <div className="col-span-8 md:col-span-2 flex flex-col justify-center border-b-2 md:border-b-0 order-2 xl:order-3">
        <div className="flex items-center justify-center flex-col xl:flex-row space-x-1">
          <FaUser size={15} className="text-main-color" />
          <p className="text-xs text-main-color">Rooms | Adults, Children</p>
        </div>
        <div className="flex justify-center">
          <PopoverDemo handleUpdate={handleUpdate} />
        </div>
      </div>
      <div className="flex justify-center items-center md:p-0 col-span-8 md:col-span-2 order-4">
        <Link to="/hotels">
          <Button
            onClick={() => {
              hotelBookingInfo();
            }}
            variant="default"
          >
            Book Now
          </Button>
        </Link>
      </div>
    </div>
  );
}
