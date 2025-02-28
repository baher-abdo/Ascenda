import MotionEffect from "../MotionEffect/MotionEffect";
import SetScrollToUp from "../SetScrollToUp/SetScrollToUp";
export default function UnderDevelopment() {
  return (
    <section className="container flex items-center justify-center h-screen bg-gray-100">
      <SetScrollToUp />
      <MotionEffect>
        <h3 className="h3 text-center md:text-4xl font-bold text-main-color">This page may be under development</h3>
      </MotionEffect>
    </section>
  );
}
