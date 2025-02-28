import { Input } from "../../components/ui/input";
import { IoSearchOutline } from "react-icons/io5";

export default function SearchByName({ value }: { value: (value: string) => void }) {
  return (
    <div className="p-3 bg-main-color rounded-md">
      <p className="text-white text-sm font-light mt-2">Search by hotel name</p>
      <div className="relative my-2">
        <IoSearchOutline className="absolute top-2 left-2 text-gray-600" size={20} />
        <Input
          onChange={(e) => {
            value(e.target.value.toLocaleLowerCase());
          }}
          type="text"
          className="bg-white ps-8"
          placeholder="eg. The Fullerton Hotel"
        />
      </div>
    </div>
  );
}
