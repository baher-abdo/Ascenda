import MotionEffect from "../MotionEffect/MotionEffect";
import getAmenityIcon from "./AmenitiesIcons";

export default function Amenities({ facilities }: { facilities: string[] }) {
  return (
    <section>
      <MotionEffect>
        <div className="grid grid-cols-12 py-2">
          <div className="col-span-12">
            <h4 className="h4 font-bold my-4">Amenities</h4>
          </div>
          <div className="col-span-12 md:col-span-8 flex flex-wrap gap-5">
            {facilities.map((item, index) => {
              return (
                <div key={index} className="flex w-fit items-center space-x-2 bg-white p-4 rounded-xl">
                  {getAmenityIcon(item)}
                  <h5 className="h5">{item}</h5>
                </div>
              );
            })}
          </div>
        </div>
      </MotionEffect>
    </section>
  );
}
