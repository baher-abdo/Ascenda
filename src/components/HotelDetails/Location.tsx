import MotionEffect from "../MotionEffect/MotionEffect";

export default function Location({ location }: { location: string }) {
  return (
    <section className="py-2">
      <MotionEffect>
        <h4 className="h4 font-bold my-4">Location</h4>
        <div className="bg-white rounded-md p-2 md:p-8">
          <iframe src={location} width={"100%"} height={450} style={{ border: 0 }} allowFullScreen referrerPolicy="no-referrer-when-downgrade" />
        </div>
      </MotionEffect>
    </section>
  );
}
