import "../../../node_modules/swiper/modules/effect-fade.css";
import { useEffect, useState } from "react";
import SwiperComponent from "./SwiperComponent";

type Props = {
  roomsImages: string[];
  images: { cover: string; featured: string[] };
  setImgSrc: Function;
  setOpenDialog: Function;
};
export default function Slider(props: Props) {
  const { roomsImages, images, setImgSrc, setOpenDialog } = props;
  const [sliderImages, setSliderImages] = useState({
    images,
    roomsImages,
  });

  const handleClickImage = (imageSrc: string): void => {
    setImgSrc(imageSrc);
    setOpenDialog(true);
  };

  const hasMultipleImages = () => (sliderImages?.roomsImages?.length > 1 ? true : false);

  useEffect(() => {
    setSliderImages({
      images,
      roomsImages,
    });
    return () => {
      setSliderImages({
        images: { cover: "", featured: [""] },
        roomsImages: [""],
      });
    };
  }, [roomsImages, images]);

  return (
    <section className="grid grid-cols-12 xl:space-x-3 pt-3">
      <div className="col-span-12 xl:col-span-8 rounded-md overflow-hidden h-48 xl:h-96">
        <SwiperComponent getImgSrc={handleClickImage} images={[sliderImages?.images?.cover, ...(sliderImages?.images?.featured || [])].flat()} multipleImages={hasMultipleImages()} />
      </div>
      <div className="col-span-12 xl:col-span-4 mt-3 xl:mt-0 space-y-3 rounded-md overflow-hidden flex flex-col h-96">
        <div className="rounded-md overflow-hidden">
          <SwiperComponent getImgSrc={handleClickImage} images={sliderImages?.roomsImages || []} multipleImages={hasMultipleImages()} />
        </div>
        <div className="rounded-md overflow-hidden">
          <SwiperComponent getImgSrc={handleClickImage} images={[...(sliderImages?.roomsImages || [])].reverse()} multipleImages={hasMultipleImages()} />
        </div>
      </div>
    </section>
  );
}
