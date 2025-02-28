import { Link } from "react-router";
import { Button } from "../ui/button";
import MotionEffect from "../MotionEffect/MotionEffect";
import SetScrollToUp from "../SetScrollToUp/SetScrollToUp";

export default function NotFoundPage() {
  return (
    <section className="container self-center">
      <SetScrollToUp />
      <MotionEffect>
        <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6 relative">
          <div className="mx-auto max-w-screen-sm text-center">
            <h3 className="h3 mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-main-color">404</h3>
            <p className="mb-4 text-3xl tracking-tight font-bold text-main-color md:text-4xl">Something's missing.</p>
            <p className="mb-4 text-lg font-light text-gray-500">Sorry, we can't find that page. You'll find lots to explore on the home page.</p>
            <Button variant="default" className="inline-flex font-medium rounded-lg text-sm px-5 py-2.5 text-center  my-4">
              <Link to="/">Back to Homepage</Link>
            </Button>
          </div>
        </div>
      </MotionEffect>
    </section>
  );
}
