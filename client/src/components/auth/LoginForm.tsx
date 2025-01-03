"use client";

import CardWarpper from "./CardWrapper";
import {
  Form,
  FormControl,
  FormLabel,
  // FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { ImSpinner8 } from "react-icons/im";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";

import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import toast from "react-hot-toast";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

import { LoginSchema } from "@/interface/auth";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { login, googleAuth } from "@/lib/authApi";
import { LoginModal } from "../modals/login-modal";

const LoginForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirectUrl") || "/main";
  const {
    mutate: loginHandler,
    isError,
    isPending,
  } = useMutation({
    mutationFn: login,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (response) => {
      console.log(response);
      const loginReturnData = response.data;
      if (loginReturnData) {
        if (loginReturnData.role === "admin") {
          router.replace("/admin");
          toast.success(loginReturnData.message);
        } else {
          router.replace(redirectUrl);
          toast.success(loginReturnData.message);
        }
      }
    },
  });

  const [showPassword, setShowPassword] = useState(false);

  const form = useForm({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: z.infer<typeof LoginSchema>) => {
    console.log(data);
    loginHandler(data);
  };

  const googleHandler = () => {
    window.location.href = "http://localhost:4000/api/auth/google";
  };

  const facebookHandler = () => {
    window.location.href = "http://localhost:4000/api/auth/facebook";
  }

  const errorValue = searchParams.get("error");

  // State để mở/đóng modal
  const [showErrorModal, setShowErrorModal] = useState(false);

  useEffect(() => {
    if (errorValue === "email_exists") {
      setShowErrorModal(true);
    }
  }, [errorValue]);

  return (
    <>
      <LoginModal
        isOpen={showErrorModal}
        onClose={() => setShowErrorModal(false)}
        onConfirm={() => setShowErrorModal(false)}
      ></LoginModal>
      <CardWarpper
        label="Welcome Back"
        title="Login"
        backButtonHref="/auth/register"
        backButtonLabel="Don't have an account? Register here."
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-semibold">
                      Email
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="email"
                        placeholder="Enter your email"
                        className="focus:border focus:border-primary"
                      />
                    </FormControl>
                    <FormMessage></FormMessage>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-semibold">
                      Password
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          placeholder="Enter your password"
                          className="focus:border focus:border-black pr-10"
                          type={showPassword ? "text" : "password"}
                          {...field}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-600"
                        >
                          {showPassword ? (
                            <FaRegEyeSlash size={20} />
                          ) : (
                            <FaRegEye size={20} />
                          )}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage></FormMessage>
                  </FormItem>
                )}
              />
            </div>
            <div
              className="cursor-pointer"
              onClick={() => router.push("/email/forgot")}
            >
              <p className="text-[12px] text-blue-500 justify-end flex">
                Forgot your Password?
              </p>
            </div>
            <div>
              <Button
                type="submit"
                size="lg"
                className="w-full"
                disabled={isPending}
              >
                {isPending && (
                  <ImSpinner8 className="mr-2 h-4 w-4 animate-spin" />
                )}
                Sign In with Email
              </Button>
            </div>
          </form>
          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-center text-xs uppercase">
              <span className="bg-white px-4 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>

          <Button
            variant="outline"
            type="button"
            disabled={isPending}
            size="lg"
            className="w-full"
            onClick={googleHandler}
          >
            {isPending ? (
              <ImSpinner8 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <FcGoogle className="mr-2 h-4 w-4" />
            )}{" "}
            Sign in with Google
          </Button>

          <Button
            variant="outline"
            type="button"
            disabled={isPending}
            size="lg"
            className="w-full"
            onClick={facebookHandler}
          >
            {isPending ? (
              <ImSpinner8 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <FaFacebook className="mr-2 h-4 w-4 to-blue-500" />
            )}{" "}
            Sign in with Facebook
          </Button>
        </Form>
      </CardWarpper>
    </>
  );
};

export default LoginForm;
