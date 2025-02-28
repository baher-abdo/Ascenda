import { format } from "date-fns";
import { Card, CardContent } from "../../components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../../components/ui/carousel";
type Props = {
  reviewer: string;
  rating: number;
  comment: string;
  date: string;
}[];
export function CarouselDemo({ reviews }: { reviews: Props }) {
  return (
    <Carousel className="w-full">
      <CarouselContent>
        {reviews.map((review, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <Card className="border-0 shadow-none px-4">
                <CardContent className="flex flex-col items-center justify-center select-none">
                  <h4 className="font-semibold text-main-color mb-4">{review?.reviewer}</h4>
                  <p className="text-sm text-start text-gray-600">{review?.comment}</p>
                  <p className="text-[0.63rem] text-gray-600 self-start mt-4">{format(new Date(review?.date), "EEE, dd MMM, yyyy")}</p>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
