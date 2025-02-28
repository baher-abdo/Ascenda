import { Separator } from "../../components/ui/separator";
import { Card, CardContent, CardFooter, CardHeader } from "../../components/ui/card";
import { RoomsInterface } from "../../interfaces/hotelInterface";
import { useEffect, useState } from "react";

type pricingData = {
  adult: number;
  room: number;
  night: number;
  price: number;
};

export function PricingSummary({ details }: { details: Partial<RoomsInterface> }) {
  const [pricingData, setPricingData] = useState<pricingData>({
    adult: 0,
    room: 0,
    night: 0,
    price: 0,
  });
  const totalValues = () => {
    return Math.ceil(pricingData?.night) * pricingData?.price * pricingData?.room;
  };
  const handlePricingData = () => {
    const booking = localStorage.getItem("bookingDetails");
    if (booking) {
      const parsedBooking = JSON.parse(booking);
      setPricingData({
        ...pricingData,
        room: parsedBooking?.rooms || [],
        price: Number(details?.price?.perNight) || 0,
        night: parsedBooking?.night || null,
      });
    }
  };
  
  useEffect(() => {
    handlePricingData();
  }, [details]); 

  return (
    <Card className="xl:w-[350px] space-y-4 col-span-2 md:col-span-1 xl:col-span-2">
      <CardHeader className="p-0 px-6 pt-4">
        <h5 className="font-bold h5">Pricing Summary</h5>
      </CardHeader>
      <CardContent className="px-6 py-4 flex items-start">
        <div className="w-full space-y-6">
          <div className="flex justify-between items-center">
            <p className="text-xs text-gray-600">
              {pricingData.room} room x {Math.ceil(pricingData.night)} night
            </p>
            <span className="text-xs text-gray-600">{totalValues()} $</span>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-xs text-gray-600">Tax and service fees </p>
            <span className="text-xs text-gray-600">120 $</span>
          </div>
          <Separator orientation="horizontal" />
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex justify-between items-center w-full">
          <p className="text-sm text-gray-800">Total</p>
          <span className="text-sm text-gray-800">{totalValues() + 120} $</span>
        </div>
      </CardFooter>
    </Card>
  );
}
