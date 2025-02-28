import { HoverCard, HoverCardContent, HoverCardTrigger } from "../../components/ui/hover-card";
import { Button } from "../ui/button";
import { CarouselDemo } from "./Carousel";

export function HoverCardDemo({ reviews }: any) {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button variant="link" className="text-sm font-light px-1">
          ( {reviews.length} Reviews )
        </Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-[400px] relative">
        <div className="flex justify-between space-x-4">
          <CarouselDemo reviews={reviews} />
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
