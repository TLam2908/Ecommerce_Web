"use client";
import CardWrapper from "@/components/auth/CardWrapper";
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
import { CheckCircleIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { sendPasswordResetEmail } from "@/lib/authApi";
import { ForgotPasswordSchema } from "@/schema/auth";
import toast from "react-hot-toast";

const SendPasswordResetForm = () => {
  const router = useRouter();
  const {
    mutate: sendPasswordResetEmailHandler,
    isError,
    isPending,
    isSuccess
  } = useMutation({
    mutationFn: sendPasswordResetEmail,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: () => {
      toast.success("Password reset email sent. Please check your inbox.");
    },
  });

  const form = useForm({
    resolver: zodResolver(ForgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (data: z.infer<typeof ForgotPasswordSchema>) => {
    console.log(data);
    sendPasswordResetEmailHandler(data.email);
  };

  return (
    <div className="bg-white h-screen flex justify-center items-center">
      <CardWrapper
        title="Reset your password"
        label="Enter your email to reset your password"
        backButtonHref=""
        backButtonLabel=""
      >
        <Form {...form}>
          {isSuccess ? (
            <Alert className="bg-green-100/30 border border-green-400 text-green-700 py-4 rounded-lg">
              <CheckCircleIcon className="w-4 h-4 text-green-500" />
              <div className="">
                <AlertTitle className="font-bold">Success</AlertTitle>
                <AlertDescription>Your request has been sent</AlertDescription>
              </div>
            </Alert>
          ) : (
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-4">
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
                  Send your email
                </Button>
              </div>
            </form>
          )}

          <div className="flex flex-row justify-center items-center pt-4">
            Go back to
            <Button
              variant="link"
              className="text-blue-400"
              onClick={() => router.replace("/auth/login")}
            >
              Sign In
            </Button>
            or
            <Button
              variant="link"
              className="text-blue-400"
              onClick={() => router.replace("/auth/register")}
            >
              Sign Up
            </Button>
          </div>
        </Form>
      </CardWrapper>
    </div>
  );
};

export default SendPasswordResetForm;
