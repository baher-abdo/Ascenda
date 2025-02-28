import { useEffect, useState } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "../../components/ui/card";
import { Separator } from "../../components/ui/separator";
import { RoomsInterface } from "../../interfaces/hotelInterface";
import { UserCheckInterface } from "../../interfaces/userInterface";
import { addDays, format } from "date-fns";
export function BookingDetails({ details }: { details: Partial<RoomsInterface> }) {
  const [checkDetails, setCheckDetails] = useState<UserCheckInterface>();
  console.log(checkDetails);
  const getBookingsData = () => {
    const booking = localStorage.getItem("bookingDetails");
    if (booking) {
      setCheckDetails(JSON.parse(booking));
    } else {
      setCheckDetails({
        ...checkDetails,
        location: "",
        from: format(new Date(), "EEE, dd MMM, yyyy"),
        to: format(addDays(new Date(), 1), "EEE, dd MMM, yyyy"),
        adults: 0,
        children: 0,
        rooms: 0,
        night: 0,
      });
    }
  };
  useEffect(() => {
    getBookingsData();
  }, []);

  return (
    <Card className="xl:w-[350px] space-y-4 col-span-2 md:col-span-1 xl:col-span-2">
      <CardHeader className="p-0 px-6 pt-4">
        <h5 className="font-bold h5">Your booking details</h5>
      </CardHeader>
      <CardContent className="px-6 py-4 flex items-start">
        <div>
          <div className="flex h-5 items-center justify-center space-x-4 text-sm">
            <div className="space-y-1">
              <p>Check-in</p>
              <h5 className="h5 font-medium">{checkDetails?.from}</h5>
              <p className="text-gray-400">From 02:00 PM</p>
            </div>
            <Separator orientation="vertical" className="h-14" />
            <div>
              <div className="space-y-1">
                <p>Check-out</p>
                <h5 className="h5 font-medium">{checkDetails?.to}</h5>
                <p className="text-gray-400">Until 02:00 PM</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <div className="space-y-6">
          <p className="text-xs">{details?.name}</p>
          <p className="text-xs">
            {Math.ceil(Number(checkDetails?.night))} night, {checkDetails?.adults} adults, {checkDetails?.children} childrens
          </p>
        </div>
      </CardFooter>
    </Card>
  );
}
