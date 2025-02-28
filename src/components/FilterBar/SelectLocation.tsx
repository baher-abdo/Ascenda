import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";

const locations = ["Sharm El Sheikh", "Alexandria", "Cairo"];

export default function SelectLocation({ handleUpdate }: { handleUpdate: Function }) {
  return (
    <Select onValueChange={(value) => handleUpdate({ location: value })}>
      <SelectTrigger className="w-[130px] text-gray-500 border-0">
        <SelectValue placeholder="Location" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {locations.map((location, index) => (
            <SelectItem key={index} value={location} className="capitalize cursor-pointer">
              {location}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
