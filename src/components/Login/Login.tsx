import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { z } from "zod";
import loginImage from "../../assets/images/login.png";
import { Button } from "../../components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../../components/ui/form";
import { Input } from "../../components/ui/input";
import { IoEyeOutline } from "react-icons/io5";
import { IoEyeOffOutline } from "react-icons/io5";
import { Loader2 } from "lucide-react";
import { Link, useNavigate } from "react-router";
import MotionEffect from "../MotionEffect/MotionEffect";
import { login, userLogin } from "../../redux/slices/login";
import { useDispatch, useSelector } from "react-redux";
import { storeDispatch, storeState } from "../../redux/store";
import { LoginDataInterface } from "@/interfaces/userInterface";
import { useToast } from "../../hooks/use-toast";
import SetScrollToUp from "../SetScrollToUp/SetScrollToUp";

const FormSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(6, { message: "Must have at least 6 character" })
    .regex(/^(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, {
      message: "Password must include symbols, numbers, and letters.",
    }),
});

export default function Login() {
  const { toast } = useToast();
  const userId: string | null = localStorage.getItem("userId");
  const { isLoading } = useSelector((state: storeState) => state.signin);
  const dispatch = useDispatch<storeDispatch>();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const navigate = useNavigate();
  const previousPath = sessionStorage.getItem("previousPath") || "/";
  const form = useForm<LoginDataInterface>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  function onSubmit(data: LoginDataInterface) {
    dispatch(login(data)).then((res) => {
      if (res.payload === "email or password is not correct" || res.payload.length === 0) {
        return toast({
          variant: "destructive",
          title: "Sign in error",
          description: "Invalid email or password",
        });
      } else {
        localStorage.setItem("userId", JSON.stringify({ id: res.payload[0].id, name: res.payload[0].name }));
        {
          previousPath === "/registration" ? navigate("/") : navigate(-1);
        }
        navigate("/");
        dispatch(userLogin());
        return toast({
          variant: "default",
          title: `welcome back ${res.payload[0].name}`,
        });
      }
    });
  }

  useEffect(() => {
    if (userId) {
      navigate(-1);
    }
  }, []);

  return (
    <section className="container items-center self-center">
      <SetScrollToUp />
      <MotionEffect>
        <div className="bg-white py-12 grid grid-cols-1 xl:grid-cols-2 rounded-xl shadow-xl md:mt-14">
          <div className="flex flex-col items-center">
            <h3 className="h3 mb-16 font-medium">Sign In</h3>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="w-full px-6 xl:px-12 space-y-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>E mail</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl className="relative">
                        <div className="relative">
                          {!showPassword && (
                            <IoEyeOutline onClick={() => (showPassword ? setShowPassword(false) : setShowPassword(true))} size={20} className="absolute right-3 top-2 cursor-pointer text-gray-600" />
                          )}
                          {showPassword && (
                            <IoEyeOffOutline
                              onClick={() => (showPassword ? setShowPassword(false) : setShowPassword(true))}
                              size={20}
                              className="absolute right-3 top-2 cursor-pointer text-gray-600"
                            />
                          )}
                          <Input type={showPassword ? "text" : "password"} placeholder="Enter your password" {...field} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" disabled={isLoading}>
                  {" "}
                  {isLoading && <Loader2 className="animate-spin" />} Login
                </Button>
                <div>
                  <span className="text-gray-600 text-sm">
                    Don't have an account?{" "}
                    <Link to="/registration" className="text-main-color font-bold">
                      Sign up here
                    </Link>
                  </span>
                </div>
              </form>
            </Form>
          </div>
          <div className="hidden xl:flex justify-center items-center">
            <img src={loginImage} alt="login Image" draggable="false" className="w-[75%]" />
          </div>
        </div>
      </MotionEffect>
    </section>
  );
}
