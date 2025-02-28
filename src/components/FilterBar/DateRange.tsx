import * as React from "react";
import { addDays, format } from "date-fns";
import { DateRange } from "react-day-picker";
import { cn } from "../../lib/utils";
import { Button } from "../../components/ui/button";
import { Calendar } from "../../components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../../components/ui/popover";

export function DatePickerWithRange({
  className,
  handleUpdate,
}: React.HTMLAttributes<HTMLDivElement> & {
  handleUpdate: Function;
}) {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 2),
  });

  React.useEffect(() => {
    handleUpdate({
      from: date?.from ? format(date.from, "EEE, dd MMM, yyyy") : undefined,
      to: date?.to ? format(date.to, "EEE, dd MMM, yyyy") : undefined,
      night: date?.from && date?.to ? Number((Math.ceil(new Date(date.to).getTime()) - Math.ceil(new Date(date.from).getTime())) / 1000 / 60 / 60 / 24) : 1,
    });
  }, [date]);
  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(" w-[190px] justify-start text-left font-normal shadow-none p-0 hover:bg-transparent text-gray-500 hover:text-gray-500 border-none", !date && "text-muted-foreground")}
          >
            {date?.from ? (
              date.to ? (
                <>
                  <div className="flex justify-between w-full ">
                    <span>{format(date.from, "LLL dd, y")}</span>-<span>{format(date.to, "LLL dd, y")}</span>
                  </div>
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar initialFocus mode="range" defaultMonth={date?.from} selected={date} onSelect={setDate} numberOfMonths={2} />
        </PopoverContent>
      </Popover>
    </div>
  );
}
