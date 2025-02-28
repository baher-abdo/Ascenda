import { useEffect, useState } from "react";
import { Checkbox } from "../../components/ui/checkbox";
import Rating from "./Rating";

type props = { setHotelStars: (star: number) => void; result: number[]; isLoading: boolean };
export default function StarRating({ setHotelStars, result, isLoading }: props) {
  const resultStars = (star: number) => result?.filter((res) => res === star)?.length;

  const [stars, setStars] = useState<{ star: number; result: number; status: boolean }[]>([]);

  const handleStarSelect = (selectedIndex: number) => {
    const updatedStars = stars.map((item, index) => ({
      ...item,
      status: index === selectedIndex ? !item.status : false,
    }));
    setStars(updatedStars);
    const status = updatedStars.filter((e) => e.status === true);
    status.length > 0 ? setHotelStars(updatedStars[selectedIndex].star) : setHotelStars(0);
  };

  useEffect(() => {
    if (result) {
      setStars([
        { star: 5, result: resultStars(5), status: false },
        { star: 4, result: resultStars(4), status: false },
        { star: 3, result: resultStars(3), status: false },
        { star: 2, result: resultStars(2), status: false },
        { star: 1, result: resultStars(1), status: false },
      ]);
    }
  }, [isLoading]);

  return (
    <div className="rounded-md  overflow-hidden border-[1px] border-gray-300">
      <div className="bg-main-color p-3">
        <p className="text-white text-sm font-light">star Range</p>
      </div>
      <div className="p-3 space-y-3">
        {stars.map((star, index) => {
          return (
            <div key={index} className="flex space-x-2 items-center">
              <Checkbox
                id={`star${index}`}
                value={star.star}
                checked={star.status}
                onCheckedChange={() => {
                  handleStarSelect(index);
                }}
              />
              <div className="flex justify-between text-gray-700 leading-none w-full">
                <label htmlFor={`star${index}`} className="text-sm font-normal cursor-pointer">
                  <div className="flex">
                    <Rating rating={star.star} />
                  </div>
                </label>
                <span className="text-xs font-normal">{star.result}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
