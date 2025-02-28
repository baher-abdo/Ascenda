import { Separator } from "../../components/ui/separator";

export function SeparatorDemo({
  popoverData,
}: {
  popoverData: { value: string }[];
}) {
  return (
    <div>
      <div className="flex h-5 items-center w-full space-x-4 text-xs ps-1 xl:ps-6">
        <div>{popoverData[2].value}</div>
        <Separator orientation="vertical" />
        <div>{popoverData[0].value}</div>
        <Separator orientation="vertical" />
        <div>{popoverData[1].value}</div>
      </div>
    </div>
  );
}
