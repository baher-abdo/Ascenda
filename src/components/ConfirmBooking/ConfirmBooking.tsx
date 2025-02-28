import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "../../components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../../components/ui/form";
import { Input } from "../../components/ui/input";
import { SelectDate } from "./SelectDate";
import { FormSchema } from "./validation";
import { SelectedHotel } from "./SelectedHotel";
import { BookingDetails } from "./BookingDetails";
import { PricingSummary } from "./PricingSummary";
import MotionEffect from "../MotionEffect/MotionEffect";
import Loader from "../Loader/Loader";
import { HotelReservationInterface, HotelInterface } from "../../interfaces/hotelInterface";
import { useDispatch, useSelector } from "react-redux";
import { storeDispatch, storeState } from "@/redux/store";
import SetScrollToUp from "../SetScrollToUp/SetScrollToUp";
import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import { RoomsInterface } from "../../interfaces/hotelInterface";
import { getUserBookings, submitBookings } from "../../redux/slices/userBookings";
import { useToast } from "../../hooks/use-toast";
import { Loader2 } from "lucide-react";

const guestData = [
  { name: "firstName", label: "First name", required: true },
  { name: "lastName", label: "Last name", required: true },
  { name: "phone", label: "Phone Number", required: true },
  { name: "email", label: "Email Address", required: true },
];
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const generateYears = (count: number) => {
  const currentYear = new Date().getFullYear();
  return Array.from({ length: count }, (_, i) => (currentYear + i).toString());
};

export default function ConfirmBooking() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const dispatch = useDispatch<storeDispatch>();
  const userId: string | null = localStorage.getItem("userId");
  const bookingDetails: string | null = localStorage.getItem("bookingDetails");
  const { hotelId, roomId } = useParams<{ hotelId: string; roomId: string }>();
  const { loading }: { loading: boolean } = useSelector((state: storeState) => state.bookings);
const parsedUserId = userId && JSON.parse(userId).id
  const { isLoading, singleHotelData }: { isLoading: boolean; singleHotelData: HotelInterface[] } = useSelector((state: storeState) => state.hotels);

  const [bookingsData, setbookingsData] = useState<RoomsInterface>();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
    },
  });

  const [confirmedBooking, setConfirmedBooking] = useState<HotelReservationInterface>({
    hotelId,
    roomId,
    image: "",
    name: "",
    stars: 0,
    address: "",
    rating: 0,
    reviews: "",
    rooms: 0,
    price: 0,
    checkIn: "",
    checkOut: "",
  });
  const setUserBookings = async () => {
    if (!userId) {
      return;
    }

    try {
      const response = await dispatch(getUserBookings(parsedUserId)).unwrap();

      if (!response.bookings || !Array.isArray(response.bookings)) {
        return;
      }

      let updatedBookings = [...response.bookings, confirmedBooking];

      const submitRes = await dispatch(submitBookings({ id: parsedUserId, bookings: updatedBookings })).unwrap();
      toast({
        title: "Hotel booked successfully!",
        description: singleHotelData[0].name?.split(" ").slice(0, 4).join(" ")?.toLowerCase(),
      });
      navigate("/bookings");
      return submitRes;
    } catch (error) {}
  };

  const handleConfirmedBooking = () => {
    const curentHotel = singleHotelData[0];
    const bookingDetails = localStorage.getItem("bookingDetails");
    const parsedBooking = bookingDetails && JSON.parse(bookingDetails);
    const selectedRoom = curentHotel?.rooms?.find((item) => item.id === Number(roomId));
    const roomPrice = selectedRoom?.price?.perNight ? Number(selectedRoom.price.perNight) : 0;

    setConfirmedBooking((prev) => ({
      ...prev,
      image: curentHotel?.images?.cover || "",
      name: curentHotel?.name?.toLowerCase() || "",
      stars: curentHotel?.stars || 0,
      address: curentHotel?.location?.address || "",
      rating: curentHotel?.rating || 0,
      reviews: curentHotel?.pleasant || "",
      rooms: parsedBooking?.rooms || 0,
      price: roomPrice,
      checkIn: parsedBooking?.from || "",
      checkOut: parsedBooking?.to || "",
    }));
  };

  function onSubmit(data: z.infer<typeof FormSchema>) {
    setUserBookings();
    localStorage.removeItem("bookingDetails");
    return data;
  }
  useEffect(() => {
    handleConfirmedBooking();
    setbookingsData(singleHotelData[0]?.rooms?.find((item) => item.id === Number(roomId)));
    if (!bookingDetails) {
      navigate(-1);
    }
  }, [singleHotelData]);
  return (
    <section className="container  mg:px-0  py-16">
      {isLoading && <Loader />}
      <SetScrollToUp />
      <MotionEffect>
        <div className="my-7 text-center xl:text-left">
          <h4 className="h4 text-main-color font-bold my-3 xl:my-0">Confirm Booking</h4>
        </div>
        <div className="grid grid-cols-12 gap-y-6 xl:gap-y-0">
          <div className="space-y-6 col-span-12 xl:col-span-8 order-2 xl:order-1">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="bg-white p-4 md:p-8">
                  <h4 className="font-medium mb-6">Payment Information</h4>
                  <div className="grid grid-cols-2 gap-6 xl:pe-32">
                    <FormField
                      control={form.control}
                      defaultValue=""
                      name="cardName"
                      render={({ field }) => (
                        <FormItem className="col-span-2 md:col-span-1">
                          <FormLabel className="text-sm font-normal">
                            Name on card <span className="text-gray-500 text-[0.63rem]">(optional)</span>
                          </FormLabel>
                          <FormControl>
                            <Input className="text-sm font-light" {...field} />
                          </FormControl>
                          <FormMessage className="text-xs font-light" />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      defaultValue=""
                      name="cardNumber"
                      render={({ field }) => (
                        <FormItem className="col-span-2 md:col-span-1">
                          <FormLabel className="text-sm font-normal">
                            Credit Card Number
                            <span className="text-red-500"> *</span>
                          </FormLabel>
                          <FormControl>
                            <Input className="text-sm font-light" type="number" {...field} />
                          </FormControl>
                          <FormMessage className="text-xs font-light" />
                        </FormItem>
                      )}
                    />
                    <div className="grid grid-cols-2 gap-6 col-span-2 xl:col-span-1">
                      <SelectDate values={months} label="month" name="month" />
                      <SelectDate values={generateYears(6)} label="year" name="year" />
                    </div>
                    <FormField
                      control={form.control}
                      defaultValue=""
                      name="cvc"
                      render={({ field }) => (
                        <FormItem className="col-span-2 md:col-span-1">
                          <FormLabel className="text-sm font-normal">
                            CVV/CVC
                            <span className="text-red-500"> *</span>
                          </FormLabel>
                          <FormControl>
                            <Input className="text-sm font-light" type="number" {...field} />
                          </FormControl>
                          <FormMessage className="text-xs font-light" />
                        </FormItem>
                      )}
                    />
                    {guestData.map((input, index) => {
                      return (
                        <FormField
                          key={index}
                          control={form.control}
                          name={input.name as keyof z.infer<typeof FormSchema>}
                          render={({ field }) => (
                            <FormItem className="col-span-2 md:col-span-1">
                              <FormLabel className="text-sm font-normal">
                                {input.label}
                                {input.required && <span className="text-red-500"> *</span>}
                              </FormLabel>
                              <FormControl>
                                <Input type={input.name === "phone" ? "tel" : "text"} className="text-sm font-light" {...field} />
                              </FormControl>
                              <FormMessage className="text-xs font-light" />
                            </FormItem>
                          )}
                        />
                      );
                    })}
                  </div>
                </div>
                <div className="flex justify-center mt-8">
                  <Button className="w-6/12" type="submit" disabled={loading}>
                    {loading && <Loader2 className="animate-spin" />}
                    Confirm & Proceed
                  </Button>
                </div>
              </form>
            </Form>
          </div>
          <div className="col-span-12 xl:col-span-4 order-1 xl:order-2">
            <div className="gap-6 grid grid-cols-2 xl:justify-items-end	">
              <SelectedHotel hotelId={Number(hotelId)} singleHotelData={singleHotelData[0]} />
              <BookingDetails details={bookingsData || {}} />
              <PricingSummary details={bookingsData || {}} />
            </div>
          </div>
        </div>
      </MotionEffect>
    </section>
  );
}
