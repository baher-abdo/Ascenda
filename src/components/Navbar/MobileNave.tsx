import { Button } from "../../components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "../../components/ui/sheet";
import { links } from "./Navbar";
import { AvatarDemo } from "./Avatar";
import { LiaBarsSolid } from "react-icons/lia";
import { Link, useNavigate } from "react-router";
import { IoExitOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import { storeState } from "@/redux/store";
import { useDispatch } from "react-redux";
import { userLogin } from "../../redux/slices/login";

export function MobileNave() {
  const { isLogin } = useSelector((state: storeState) => state.signin);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function logout() {
    localStorage.removeItem("userId");
    dispatch(userLogin());
    navigate("/login");
  }
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="bg-transparent hover:bg-transparent">
          <LiaBarsSolid className="scale-[1.5]" color="white" cursor={"pointer"} />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>
            <div className="flex items-center justify-center gap-x-3 mt-12">
              <AvatarDemo isLogin={!!localStorage.getItem("userId")} />
            </div>
          </SheetTitle>
          <SheetDescription></SheetDescription>
        </SheetHeader>
        <div className="py-4">
          <div className="flex justify-end flex-col items-center">
            <ul className="capitalize text-center text-white">
              {links.map((link, index) => {
                return (
                  <li key={index} className="my-4 text-xl">
                    <SheetTrigger asChild>
                      <Link to={link.path}>{link.name}</Link>
                    </SheetTrigger>
                  </li>
                );
              })}
            </ul>
            {isLogin ? (
              <>
                <SheetTrigger asChild>
                  <Button variant="outline" onClick={() => logout()}>
                    Lgout <IoExitOutline />
                  </Button>
                </SheetTrigger>
              </>
            ) : (
              <div className="my-4">
                <div className="flex gap-x-3">
                  <SheetTrigger asChild>
                    <Link to="/registration">
                      <Button variant="ghost">Register</Button>
                    </Link>
                  </SheetTrigger>
                  <SheetTrigger asChild>
                    <Link to="/login">
                      <Button variant="outline">Sign In</Button>
                    </Link>
                  </SheetTrigger>
                </div>
              </div>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
