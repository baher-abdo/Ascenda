import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y, Autoplay, EffectFade } from "swiper/modules";

type Props = {
  getImgSrc: Function;
  images: string[];
  multipleImages: boolean;
};

export default function SwiperComponent({ getImgSrc, images, multipleImages }: Props) {
  return (
    <Swiper
      modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay, EffectFade]}
      spaceBetween={50}
      slidesPerView={1}
      navigation
      loop={multipleImages}
      autoplay={{
        delay: 2000,
      }}
      effect="fade"
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
    >
      {images?.map((image: any, index: number) => (
        <SwiperSlide key={index} onClick={() => getImgSrc(image)} className="cursor-grabbing">
          <img src={image} alt="Room" className="w-full h-full" />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
