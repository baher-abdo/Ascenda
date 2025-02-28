import { useEffect, useState } from "react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "../../components/ui/popover";
import { SeparatorDemo } from "./Separator";

export function PopoverDemo({ handleUpdate }: { handleUpdate: Function }) {
  const [popoverData, setPopoverData] = useState([
    { name: "adults", value: 1 },
    { name: "children", value: 0 },
    { name: "rooms", value: 1 },
  ]);

  const convertToUserCheck = () => {
    return popoverData.reduce((acc, item) => {
      acc[item.name] = item.value;
      return acc;
    }, {} as Record<string, number>);
  };

  function incrementalValue(index: number) {
    setPopoverData((prevState) =>
      prevState.map((item, i) => {
        if (i === index) {
          return { ...item, value: item.value + 1 };
        }
        return item;
      }, convertToUserCheck())
    );
  }
  function decrementalValue(index: number) {
    setPopoverData((prevState) =>
      prevState.map((item, i) => {
        if (i === index && item.name === "children") {
          if (item.value <= 0) {
            return { ...item, value: item.value + 0 };
          } else {
            return { ...item, value: item.value - 1 };
          }
        } else if (i === index) {
          if (item.value <= 1) {
            return { ...item, value: item.value + 0 };
          } else {
            return { ...item, value: item.value - 1 };
          }
        }
        return item;
      }, convertToUserCheck())
    );
  }

  useEffect(() => {
    handleUpdate(convertToUserCheck());
  }, [popoverData]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className=" text-gray-500 hover:text-gray-500 border-none text-left shadow-none hover:bg-transparent">
          <SeparatorDemo
            popoverData={popoverData.map((item) => ({
              ...item,
              value: item.value.toString(),
            }))}
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="grid gap-2">
            {popoverData.map((item, index) => {
              return (
                <div key={index} className="grid grid-cols-3 items-center gap-4">
                  <Label htmlFor={item.name} className="capitalize">
                    {item.name}
                  </Label>
                  <div className="flex col-span-2 items-center relative">
                    <Button onClick={() => decrementalValue(index)} variant="link" className="absolute left-0">
                      -
                    </Button>
                    <Input id={item.name} className="col-span-2 h-8 text-center" value={item.value} readOnly />
                    <Button onClick={() => incrementalValue(index)} variant="link" className="absolute right-0">
                      +
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
