// import Slider from "./Slider";
import "../../../node_modules/swiper/swiper.css";
import "../../../node_modules/swiper/modules/autoplay.css";
import Rectangle from "./Rectangles";
import { useEffect, useState } from "react";
import { DialogDemo } from "./Dialog";
import MotionEffect from "../MotionEffect/MotionEffect";
import { useParams } from "react-router";
import { HotelInterface } from "../../interfaces/hotelInterface";
import { useDispatch, useSelector } from "react-redux";
import { storeDispatch, storeState } from "@/redux/store";
import { singleHotel } from "../../redux/slices/hotelsSlice";
import SetScrollToUp from "../SetScrollToUp/SetScrollToUp";
import { lazy } from "react";
import { Skeleton } from "../ui/skeleton";
const Slider = lazy(() => import("./Slider"));

export default function HotelDetails() {
  const [imgSrc, setImgSrc] = useState<string>("");
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const { id } = useParams<{ id: string }>();
  const { isLoading, singleHotelData }: { isLoading: boolean; singleHotelData: HotelInterface[] } = useSelector((state: storeState) => state.hotels);
  const curentHotel = singleHotelData[0];
  const dispatch = useDispatch<storeDispatch>();

  useEffect(() => {
    dispatch(singleHotel(Number(id)));
  }, [Slider]);

  return (
    <section className="container py-16">
      <SetScrollToUp />
      <MotionEffect>
        {isLoading ? (
          <div className="grid grid-cols-12 xl:space-x-3 pt-3">
            <div className="col-span-12 xl:col-span-8 rounded-md overflow-hidden h-48 xl:h-96">
              <Skeleton className="w-full h-48 xl:h-96 bg-gray-400" />
            </div>
            <div className="col-span-12 xl:col-span-4 mt-3 xl:mt-0 space-y-3 rounded-md overflow-hidden flex flex-col h-96">
              <div className="rounded-md overflow-hidden">
                <Skeleton className="w-full h-48 bg-gray-400" />
              </div>
              <div className="rounded-md overflow-hidden">
                <Skeleton className="w-full h-48 bg-gray-400" />
              </div>
            </div>
          </div>
        ) : (
          <Slider
            key={curentHotel?.id}
            setImgSrc={setImgSrc}
            setOpenDialog={setOpenDialog}
            images={{
              cover: curentHotel?.images?.cover || "",
              featured: curentHotel?.images?.featured || [""],
            }}
            roomsImages={curentHotel?.rooms?.flatMap((room) => room?.images || []).filter((img): img is string => !!img) || [""]}
          />
        )}
        <Rectangle details={singleHotelData[0] || {}} />
        <DialogDemo imgSrc={imgSrc} setOpenDialog={setOpenDialog} openDialog={openDialog} />
      </MotionEffect>
    </section>
  );
}
