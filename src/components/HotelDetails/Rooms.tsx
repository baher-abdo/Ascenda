import * as React from "react";
import { IoArrowDownCircleOutline } from "react-icons/io5";
import { Button } from "../../components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../../components/ui/collapsible";
import RoomType from "./RoomType";
import MotionEffect from "../MotionEffect/MotionEffect";
import { RoomsInterface } from "../../interfaces/hotelInterface";
import { addDays, format } from "date-fns";
export default function Rooms({ rooms, hotelId }: { rooms: RoomsInterface[]; hotelId: number }) {
  const bookingDetails: string | null = localStorage.getItem("bookingDetails");
  const [isOpen, setIsOpen] = React.useState(false);

  function resetScroll(): void {
    isOpen && window.scrollTo(0, 400);
  }

  const setBookingData = () => {
    if (!bookingDetails) {
      localStorage.setItem(
        "bookingDetails",
        JSON.stringify({
          location: "",
          from: format(new Date(), "EEE, dd MMM, yyyy"),
          to: format(addDays(new Date(), 1), "EEE, dd MMM, yyyy"),
          adults: 1,
          children: 0,
          rooms: 1,
          night: 1,
        })
      );
    }
  };
  return (
    <section className="py-2">
      <MotionEffect>
        <h4 className="h4 font-bold my-4">Rooms</h4>
        <div className="bg-white rounded-md p-2 xl:p-8">
          <Collapsible open={isOpen} onOpenChange={setIsOpen} className="space-y-7">
            {Array.from({ length: 2 }).map(
              (_, index) =>
                rooms?.[index] && (
                  <RoomType
                    key={rooms[index].id || 0}
                    image={rooms[index].images ?? []}
                    type={rooms[index].name ?? ""}
                    description={rooms[index].description ?? ""}
                    policies={rooms[index].policies?.cancellation ?? ""}
                    price={rooms[index].price?.perNight ?? 0}
                    hotelId={hotelId}
                    roomId={rooms[index].id ?? 0}
                    setBookingData={setBookingData}
                    avilability={rooms[index].availability ?? false}
                  />
                )
            )}
            <CollapsibleContent className="space-y-7">
              {rooms?.slice(2)?.map((room) => (
                <RoomType
                  key={room?.id || 0}
                  image={room?.images ?? []}
                  type={room?.name ?? ""}
                  description={room?.description ?? ""}
                  policies={room?.policies?.cancellation ?? ""}
                  price={room?.price?.perNight ?? 0}
                  hotelId={hotelId}
                  roomId={room?.id ?? 0}
                  setBookingData={setBookingData}
                  avilability={room?.availability ?? false}
                />
              ))}
            </CollapsibleContent>
            <div className="flex items-center justify-center">
              <CollapsibleTrigger asChild>
                <Button
                  disabled={rooms?.length <= 2}
                  variant="link"
                  size="icon"
                  className="flex flex-col space-y-2 p-12"
                  onClick={() => {
                    resetScroll();
                  }}
                >
                  <IoArrowDownCircleOutline className={`text-main-color scale-[3] transition-all ${isOpen && "rotate-180"}`} size={24} />
                  <span className="select-none transition-all">{!isOpen ? "See More Rooms" : "See Less Rooms"}</span>
                </Button>
              </CollapsibleTrigger>
            </div>
          </Collapsible>
        </div>
      </MotionEffect>
    </section>
  );
}
