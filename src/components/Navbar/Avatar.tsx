import { useNavigate } from "react-router";
import { Avatar, AvatarImage } from "../../components/ui/avatar";
import { Button } from "../ui/button";
import { IoExitOutline } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { userLogin } from "../../redux/slices/login";
import { useEffect, useState } from "react";
import MotionEffect from "../MotionEffect/MotionEffect";
import avatar from "../../assets/images/avatar.jpg";
import { Popover, PopoverContent, PopoverTrigger } from "@radix-ui/react-popover";
export function AvatarDemo({ isLogin }: { isLogin: boolean }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [userName, setUserName] = useState<{ name: string }>({ name: "" });
  function logout() {
    localStorage.removeItem("userId");
    dispatch(userLogin());
    navigate("/login");
  }
  function getUserName() {
    const name = localStorage.getItem("userId");
    if (name) {
      setUserName(JSON.parse(name));
    }
  }
  useEffect(() => {
    getUserName();
  }, []);
  return (
    isLogin && (
      <MotionEffect>
        <Popover>
          <div className="flex items-center justify-center gap-x-3 mt-12 md:mt-0">
            <h4 className="text-white h4 md:h5 md:text-[1.1em] font-medium capitalize">{userName.name}</h4>
            <PopoverTrigger asChild className="cursor-pointer">
              <Avatar>
                <AvatarImage className="w-30 h-30 object-cover" src={avatar} alt="avatar" />
              </Avatar>
            </PopoverTrigger>
          </div>
          <PopoverContent>
            <div className="hidden xl:block mt-3">
              <Button variant="outline" className="text-zinc-800" onClick={() => logout()}>
                Lgout <IoExitOutline />
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      </MotionEffect>
    )
  );
}
