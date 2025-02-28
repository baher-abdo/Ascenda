import { HotelInterface } from "@/interfaces/hotelInterface";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import Amenities from "./Amenities";
import Location from "./Location";
import Overview from "./Overview";
import Rooms from "./Rooms";
import { useState } from "react";

const tabs: string[] = ["Overview", "Amenities", "Rooms", "Location"];

export default function Rectangle({ details }: { details: Partial<HotelInterface> }) {
  const [activeTab, setActiveTab] = useState<number>(0);
  // @ts-ignore
  const { name = "", description = [], stars = 0, highlights = [] } = details || {};

  return (
    <Tabs key={activeTab} defaultValue={tabs[activeTab]} className="w-full my-6">
      <TabsList>
        {tabs.map((tab) => {
          return (
            <TabsTrigger key={tab} value={tab}>
              {tab}
            </TabsTrigger>
          );
        })}
      </TabsList>
      <TabsContent value="Overview">
        <Overview name={name} address={details?.location?.address || ""} description={description} stars={stars} highlights={highlights} setActiveTab={setActiveTab} />
      </TabsContent>
      <TabsContent value="Amenities">
        <Amenities facilities={details?.facilities || []} />
      </TabsContent>
      <TabsContent value="Rooms">
        <Rooms rooms={details.rooms || []} hotelId={Number(details.id) || 0} />
      </TabsContent>
      <TabsContent value="Location">
        <Location location={details?.location?.hotelLocation || ""} />
      </TabsContent>
    </Tabs>
  );
}
