import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import registerImg from "../../assets/images/register.png";
import { Button } from "../../components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../../components/ui/form";
import { Input } from "../../components/ui/input";
import { IoEyeOutline } from "react-icons/io5";
import { IoEyeOffOutline } from "react-icons/io5";
import { useEffect, useState } from "react";
const FormSchema = z.object({
  name: z.string().min(3, {
    message: "name must be at least 3 characters.",
  }),
  email: z.string().email(),
  password: z
    .string()
    .min(6, { message: "Must have at least 6 character" })
    .regex(/^(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, {
      message: "Password must include symbols, numbers, and letters.",
    }),
  phone: z
    .string()
    .min(11, { message: "Must have at least 11 character" })
    .regex(/^01[0125][0-9]{8}$/, { message: "invalid phone" }),
});
import { Loader2 } from "lucide-react";
import { Link, useNavigate } from "react-router";
import MotionEffect from "../MotionEffect/MotionEffect";
import { getUserByEmail, signUp } from "../../redux/slices/registration";
import { useDispatch, useSelector } from "react-redux";
import { storeDispatch, storeState } from "../../redux/store";
import { RegistrationInterface } from "@/interfaces/userInterface";
import { useToast } from "../../hooks/use-toast";
import SetScrollToUp from "../SetScrollToUp/SetScrollToUp";

export default function Register() {
  const { toast } = useToast();
  const { isLoading } = useSelector((state: storeState) => state.signUp);
  const userId: string | null = localStorage.getItem("userId");
  const dispatch = useDispatch<storeDispatch>();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const form = useForm<RegistrationInterface>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
    },
  });

  function onSubmit(data: RegistrationInterface) {
    dispatch(getUserByEmail(data.email)).then((res) => {
      if (res.payload === "email not found" || res.payload.length === 0) {
        dispatch(signUp(data)).then(() => {
          setTimeout(() => {
            navigate("/login");
          }, 1000);
          return toast({
            variant: "default",
            title: "Registration successful",
            description: "You can now sign in",
          });
        });
      } else {
        return toast({
          variant: "destructive",
          title: "Registration error",
          description: "Your email already registered",
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
    <section className="container self-center">
      <SetScrollToUp />
      <MotionEffect>
        <div className="bg-white py-6 grid grid-cols-1 xl:grid-cols-2 rounded-xl shadow-xl md:mt-14">
          <div className="flex flex-col items-center">
            <h3 className="h3 mb-16 font-medium">Create an account</h3>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="w-full px-6 xl:px-12 space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
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
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your phone" {...field} />
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
                  {isLoading && <Loader2 className="animate-spin" />} Register
                </Button>
                <div>
                  <span className="text-gray-600 text-sm">
                    Have an account?{" "}
                    <Link to="/login" className="text-main-color font-bold">
                      Sign in here
                    </Link>
                  </span>
                </div>
              </form>
            </Form>
          </div>
          <div className="hidden xl:flex justify-center items-center">
            <img src={registerImg} alt="login Image" className="w-[75%]" />
          </div>
        </div>
      </MotionEffect>
    </section>
  );
}
