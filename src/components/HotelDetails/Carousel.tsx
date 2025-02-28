import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../../components/ui/carousel";

export function CarouselDemo({ images }: { images: string[] }) {
  return (
    <Carousel className="w-full">
      <CarouselContent>
        {images?.map((img: string, index: number) => (
          <CarouselItem key={index} className="max-h-[95vh]">
            <img src={img} alt="img" draggable="false" className="md:max-h-[90vh] w-full object-contain" />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
