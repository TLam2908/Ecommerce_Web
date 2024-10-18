"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormLabel,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { AlertCircle, CheckCircleIcon } from "lucide-react";
import { ImSpinner8 } from "react-icons/im";
import CardWrapper from "@/components/auth/CardWrapper";
import { set, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { resetPassword } from "@/lib/authApi";

import { ResetPasswordSchema } from "@/interface/auth";

const ResetPasswordForm = () => {
  const router = useRouter();

  const searchParams = useSearchParams();
  const code = searchParams.get("code");
  const exp = Number(searchParams.get("exp"));
  const now = Date.now();
  const linkIsValid = code && exp && exp > now;

  const [isAlert, setIsAlert] = useState(false);

  const {
    mutate: resetPasswordHandler,
    isError,
    isSuccess,
    isPending,
  } = useMutation({
    mutationFn: resetPassword,
    onError: (error) => {
      setIsAlert(true);
      toast.error(error.message);
    },
    onSuccess: () => {
      setIsAlert(true);
      toast.success("Password reset email sent. Please check your inbox.");
    },
  });

  const form = useForm({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      password: "",
    },
  });

  const onSubmit = (data: z.infer<typeof ResetPasswordSchema>) => {
    console.log(data.password, code);
    if (code) {
      const resetData = {
        password: data.password,
        verificationCode: code,
      };
      resetPasswordHandler(resetData);
    } else {
      toast.error("Invalid reset code.");
    }
  };

  return (
    <div className="flex bg-white items-center justify-center h-screen">
      <CardWrapper
        title="Update new password"
        label="Enter your new password"
        backButtonHref=""
        backButtonLabel=""
      >
        <Form {...form}>
          {isSuccess && (
            <>
              <Alert className="bg-green-100/30 border border-green-400 text-green-700 py-4 rounded-lg">
                <CheckCircleIcon className="w-4 h-4 text-green-500" />
                <div className="">
                  <AlertTitle className="font-bold">Success</AlertTitle>
                  <AlertDescription>
                    Updated passsword successfully.
                  </AlertDescription>
                </div>
              </Alert>
              <div className="flex flex-row justify-center items-center pt-4">
                Go back to
                <Button
                  variant="link"
                  className="text-blue-400"
                  onClick={() => router.replace("/auth/login")}
                >
                  Login
                </Button>
              </div>
            </>
          )}
          {linkIsValid && !isAlert && (
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-semibold">
                        Password
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="password"
                          placeholder="********"
                        />
                      </FormControl>
                      <FormMessage></FormMessage>
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  size="lg"
                  className="w-full"
                  disabled={isPending}
                >
                  {isPending && (
                    <ImSpinner8 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Update password
                </Button>
              </div>
            </form>
          )}
          {isError && (
            <>
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle className="font-bold">Error</AlertTitle>
                <AlertDescription>
                  Invalid or expired reset password link.
                </AlertDescription>
              </Alert>
              <div className="flex flex-row justify-center items-center pt-4">
                <Button
                  variant="link"
                  className="text-blue-400 text-md"
                  onClick={() => router.replace("/email/forgot")}
                >
                  Send email again.
                </Button>
              </div>
            </>
          )}
        </Form>
      </CardWrapper>
    </div>
  );
};

export default ResetPasswordForm;
