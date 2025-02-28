import logo from "../../assets/logo/Logo.png";
import { MobileNave } from "./MobileNave";
import { AvatarDemo } from "./Avatar";
import { Link, NavLink } from "react-router";
import { useEffect, useState } from "react";
import { storeState } from "../../redux/store";
import { useSelector } from "react-redux";
import { Button } from "../ui/button";
import MotionEffect from "../MotionEffect/MotionEffect";

export const links: { path: string; name: string }[] = [
  { path: "/", name: "home" },
  { path: "/bookings", name: "bookings" },
  { path: "/hotels", name: "explore" },
  { path: "/services", name: "services" },
  { path: "/membership", name: "membership" },
];

export default function Navbar() {
  const { isLogin } = useSelector((state: storeState) => state.signin);
  const [scrollTop, setScrollTop] = useState<boolean>(false);
  useEffect(() => {
    window.scrollbars;
    const handleScroll = () => {
      window.scrollY > 50 ? setScrollTop(true) : setScrollTop(false);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <nav className={`w-full fixed z-20 ${scrollTop ? "bg-main-color/90 backdrop-blur-sm" : "bg-main-color"} h-16 flex items-center z-10 transition-colors duration-700 fix-padding-nav`}>
      <div className="container flex items-center justify-between">
        <div>
          <Link to="/" draggable="false">
            <img src={logo} alt="Logo" draggable="false" className="h-6 w-auto" />
          </Link>
        </div>
        <div className="hidden xl:flex items-center w-1/2 justify-between">
          <MotionEffect>
            <ul className="flex gap-x-5 text-white capitalize text-sm font-normal">
              {links.map((link, index) => {
                return (
                  <li key={index}>
                    <NavLink to={link.path}>{link.name}</NavLink>
                  </li>
                );
              })}
            </ul>
          </MotionEffect>
          {isLogin ? (
            <div>
              <AvatarDemo isLogin={isLogin} />
            </div>
          ) : (
            <div className="hidden xl:flex">
              <MotionEffect>
                <div className="flex gap-x-3">
                  <Link to="/registration">
                    <Button variant="ghost">Register</Button>
                  </Link>
                  <Link to="/login">
                    <Button variant="outline">Sign In</Button>
                  </Link>
                </div>
              </MotionEffect>
            </div>
          )}
        </div>
        <div className="xl:hidden">
          <MobileNave />
        </div>
      </div>
    </nav>
  );
}
