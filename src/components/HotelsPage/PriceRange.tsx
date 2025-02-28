import { useEffect, useState } from "react";
import { Checkbox } from "../../components/ui/checkbox";

export default function PriceRange({ setHotelPrice, result, isLoading }: { isLoading: boolean; setHotelPrice: Function; result: number[] }) {
  const resultPrice = (from: number, to: number) => result?.filter((res) => res > from && res < to)?.length ?? 0;

  const [prices, setPrices] = useState<{ price: string; result: number; status: boolean }[]>([]);

  const handleStarSelect = (selectedIndex: number) => {
    const updatedStars = prices.map((item, index) => ({
      ...item,
      status: index === selectedIndex ? !item.status : false,
    }));
    setPrices(updatedStars);
    setHotelPrice(updatedStars[selectedIndex].status ? [+prices[selectedIndex].price.split(" ")[1].split(",").join(""), +prices[selectedIndex].price.split(" ")[4].split(",").join("")] : []);
  };

  useEffect(() => {
    if (result) {
      setPrices([
        { price: "$ 0 - $ 200", result: resultPrice(0, 200), status: false },
        {
          price: "$ 200 - $ 500",
          result: resultPrice(200, 500),
          status: false,
        },
        {
          price: "$ 500 - $ 1,000",
          result: resultPrice(500, 1000),
          status: false,
        },
        {
          price: "$ 1,000 - $ 2,000",
          result: resultPrice(1000, 2000),
          status: false,
        },
        {
          price: "$ 2,000 - $ 5,000",
          result: resultPrice(2000, 5000),
          status: false,
        },
      ]);
    }
  }, [isLoading]);

  return (
    <div className="rounded-md border-[1px] overflow-hidden border-gray-300">
      <div className="bg-main-color p-3">
        <p className="text-white text-sm font-light">Price Range</p>
      </div>
      <div className="p-3 space-y-3">
        {prices.map((price, index) => {
          return (
            <div key={index} className="flex space-x-2 items-center">
              <Checkbox
                id={`price${index}`}
                checked={price.status}
                onCheckedChange={() => {
                  handleStarSelect(index);
                }}
              />
              <div className="flex justify-between text-gray-700 leading-none w-full">
                <label htmlFor={`price${index}`} className="text-xs font-normal cursor-pointer">
                  {price.price}
                </label>
                <span className="text-xs font-normal">{price.result}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
