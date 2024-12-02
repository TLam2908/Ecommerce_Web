"use client";

import CardWarpper from "./CardWrapper";
import {
  Form,
  FormControl,
  FormLabel,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { ImSpinner8 } from "react-icons/im";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import toast from "react-hot-toast";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

import { useState } from "react";
import { RegisterSchema } from "@/interface/auth";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { register } from "@/lib/authApi";
import { useRouter } from "next/navigation";

const RegisterForm = () => {
  const router = useRouter();
  const {
    mutate: registerHandler,
    isError,
    isPending,
  } = useMutation({
    mutationFn: register,
    onError: (error) => {
      toast.error("Internal server error");
    },
    onSuccess: () => {
      router.replace("/main");
      toast.success("Register successful");
    },
  });

  const form = useForm({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      name: "",
      password: "",
      confirmPassword: "",
    },
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const onSubmit = (data: z.infer<typeof RegisterSchema>) => {
    console.log(data);
    registerHandler(data);
  };

  return (
    <CardWarpper
      label="Create an Account"
      title="Register"
      backButtonHref="/auth/login"
      backButtonLabel="Already have an account? Login here."
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-semibold">Email</FormLabel>
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
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-semibold">Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Enter your name"
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
                        placeholder="********"
                        className="focus:border focus:border-black pr-10" // Add padding to make space for the icon
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
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-semibold">
                    Confirm Password
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        placeholder="********"
                        className="focus:border focus:border-black"
                        type={showConfirmPassword ? "text" : "password"}
                        {...field}
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-600"
                      >
                        {showConfirmPassword ? (
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
              Create new Account
            </Button>
          </div>
        </form>
      </Form>
    </CardWarpper>
  );
};

export default RegisterForm;
