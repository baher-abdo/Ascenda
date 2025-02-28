import { Link, useNavigate } from "react-router";
import { Button } from "../ui/button";
import { getUserBookings, submitBookings } from "../../redux/slices/userBookings";
import { useDispatch, useSelector } from "react-redux";
import { storeDispatch, storeState } from "@/redux/store";
import { useEffect, useState } from "react";
import { useToast } from "../../hooks/use-toast";
import { AlertDialogDemo } from "./AlertDialog";
import { DialogDemo } from "./Dialog";

type Props = {
  image: string[];
  type: string;
  description: string;
  policies: string;
  price: number;
  hotelId: number;
  roomId: number;
  setBookingData: Function;
  avilability: boolean;
}


export default function RoomType(props: Props) {
  const { image, type, description, policies, price, hotelId, roomId, setBookingData, avilability } = props;
  const dispatch = useDispatch<storeDispatch>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { loading }: { loading: boolean } = useSelector((state: storeState) => state.bookings);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [filteredroomIds, setFilteredroomIds] = useState<string[]>([]);
  const setUserBookings = async () => {
    const userId: string | null = localStorage.getItem("userId");
    const parsedUserId = userId && JSON.parse(userId).id

    if (!userId) {
      return;
    }

    try {
      const response = await dispatch(getUserBookings(parsedUserId)).unwrap();
      setFilteredroomIds(response?.bookings?.map((booking: { roomId: string }) => booking.roomId.toString()) || []);
    } catch (error) {}
  };

  const cancelUserBookings = async (roomId: string) => {
    const userId: string | null = localStorage.getItem("userId");
    const parsedUserId = userId && JSON.parse(userId).id

    if (!userId) {
      return;
    }

    try {
      const response = await dispatch(getUserBookings(parsedUserId)).unwrap();
      const result = response.bookings.filter((room: { roomId: string; hotelId: number }) => room.roomId != roomId.toString());
      if (!response.bookings || !Array.isArray(response.bookings)) {
        return;
      }

      let updatedBookings = [...result];
      const submitRes = await dispatch(submitBookings({ id: parsedUserId, bookings: updatedBookings }))
        .unwrap()
        .then(() =>
          toast({
            title: "Hotel booking cancelled successfully!",
          })
        );
      setFilteredroomIds([...result]);
      return submitRes;
    } catch (error) {}
  };

  const handleBooking = () => {
    setBookingData();
    navigate(`/conferm/${hotelId}/${roomId}`);
  };
  useEffect(() => {
    setUserBookings();
  }, []);

  return (
    <div className="card grid grid-cols-4 p-2 xl:p-4 md:space-x-5 rounded-md border border-gray-300 xl:shadow-md">
      <div className="img col-span-4 xl:col-span-1 overflow-hidden cursor-pointer relative" onClick={() => setOpenDialog(true)}>
        <div className="overlay inset-0 z-10 opacity-0 hover:opacity-25 bg-popover absolute transition-all"></div>
        <img src={image[0]} alt="img" className="w-full h-52 object-cover" draggable="false" />
      </div>
      <div className="flex flex-col justify-between col-span-4 md:col-span-2 mt-3 xl:mt-0 space-y-2">
        <div className="flex space-x-3 items-center">
          <p className="text-lg font-medium capitalize">{type}</p>
          {avilability ? <span className="text-green-600 text-sm font-light">Available</span> : <span className="text-sm font-light text-gray-600">Not Available</span>}
        </div>
        <div className="description">
          <p className="text-sm font-light">{description}</p>
        </div>
        <div>
          <p className="text-sm text-green-600">Free Cancellation, Breakfast Included</p>
          <p className="text-sm text-gray-600">{policies}</p>
        </div>
      </div>

      <div className="services col-span-4 md:col-span-2 xl:col-span-1 flex justify-between items-end md:items-end md:flex-col-reverse xl:flex-col mt-3 xl:mt-0 ">
        {loading ? (
          <div className="flex items-center space-x-1  px-14 xl:px-16">
            <p className="text-sm text-gray-600">Loading ...</p>
          </div>
        ) : (
          <>
            {filteredroomIds && localStorage.getItem("userId") && (
              <>
                {filteredroomIds.includes(roomId.toString()) && localStorage.getItem("userId") ? (
                  <div className="flex flex-col-reverse xl:flex-col gap-y-2">
                    <AlertDialogDemo cancelBook={cancelUserBookings} roomId={roomId} type={type} />
                    <p className="text-sm font-light text-green-600">You have already booked this room</p>
                  </div>
                ) : (
                  <Button disabled={!avilability} onClick={() => handleBooking()} className="px-14 xl:px-16 bg-blue-600 hover:bg-blue-500 select-none">
                    Book Now
                  </Button>
                )}
              </>
            )}
          </>
        )}

        {!localStorage.getItem("userId") && (
          <Link to={`/login`} className="text-blue-600 hover:text-blue-500 text-sm">
            Sign in or register to book
          </Link>
        )}

        <div className="pricing">
          <p className="text-sm font-light">1 room 1 night</p>
          <h5 className="h5 font-bold text-second-color">${price}</h5>
          <p className="text-sm font-light text-gray-400">Taxes incl.</p>
        </div>
      </div>
      <DialogDemo imgSrc={image} setOpenDialog={setOpenDialog} openDialog={openDialog} />
    </div>
  );
}
