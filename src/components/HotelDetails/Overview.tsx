import Rating from "../HotelsPage/Rating";
import { FaLocationDot } from "react-icons/fa6";
import { Button } from "../ui/button";
import { MdChecklist } from "react-icons/md";
import MotionEffect from "../MotionEffect/MotionEffect";
import { HotelInterface } from "../../interfaces/hotelInterface";

interface Props extends HotelInterface {
  setActiveTab: (tab: number) => void;
  address: string;
}

export default function Overview({ setActiveTab, ...hotelDetails }: Partial<Props>) {
  const { name, stars, description, address, highlights } = hotelDetails;
  return (
    <section>
      <MotionEffect>
        <div className="grid grid-cols-12 py-2 md:space-x-10">
          <div className="col-span-12 md:col-span-8">
            <h4 className="h4 font-bold my-4 capitalize">{name?.toLowerCase()}</h4>
            <div className="mt-3">
              <Rating rating={Number(stars)} />
              <div className="mt-6 flex items-center space-x-2">
                <FaLocationDot size={20} className="text-main-color" />
                <p>
                  {address} -{" "}
                  <span
                    onClick={() => {
                      setActiveTab && setActiveTab(3);
                    }}
                    className="text-blue-600 font-semibold cursor-pointer"
                  >
                    show map
                  </span>
                </p>
              </div>
              <div>
                <h4 className="h4 font-bold my-4">Overview</h4>
                {description?.map((item, index) => {
                  return (
                    <p key={index} className="text-sm my-4">
                      {item}
                    </p>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="col-span-12 md:col-span-4 flex flex-col-reverse md:flex-col items-end">
            <div className="my-6 md:my-0">
              <Button
                onClick={() => {
                  setActiveTab && setActiveTab(2);
                }}
                className="bg-blue-600 hover:bg-blue-500 mb-6"
              >
                See Room Availability
              </Button>
            </div>
            <div className="p-8 bg-white rounded-md w-full my-auto">
              <h5 className="h5 font-bold mb-4">Highlights</h5>
              <div>
                {highlights?.map((item, index) => {
                  return (
                    <div key={index} className="my-10 flex items-center space-x-3">
                      <MdChecklist size={20} className="amenities-icons-color flex-shrink-0" />
                      <p className="text-xs">{item}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </MotionEffect>
    </section>
  );
}
