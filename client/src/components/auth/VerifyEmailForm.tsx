"use client"
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, CheckCircleIcon } from "lucide-react"
import CardWrapper from "@/components/auth/CardWrapper";
import AuthHeader from "@/components/auth/AuthHeader";
import { useQuery } from "@tanstack/react-query";
import { verifyEmail } from "@/lib/authApi";
import Link from "next/link";

interface VerifyEmailFormProps {
  id: string;
}

const VerifyEmailForm = (props: VerifyEmailFormProps) => {
  const { isPending, isSuccess, isError } = useQuery({
    queryKey: ["emailVerification", props.id],
    queryFn: () => verifyEmail(props.id),
  });

  return (
    <div className="bg-white h-screen flex justify-center items-center">
      <CardWrapper
        label=""
        title=""
        backButtonHref="/auth/login"
        backButtonLabel=""
      >
        <Card className="flex flex-col justify-center items-center">
          <CardHeader>
            <AuthHeader label="" title="Verify email address" />
          </CardHeader>
          <CardContent>
            <CardDescription>
              {isError && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle className="font-bold">Error</AlertTitle>
                  <AlertDescription>
                   Invaild verification code neither found nor expired.
                  </AlertDescription>
                </Alert>
              )}
              {isSuccess && (
                <Alert className="bg-green-100/30 border border-green-400 text-green-700 py-4 rounded-lg">
                <CheckCircleIcon className="w-4 h-4 text-green-500" />
                <div className="">
                  <AlertTitle className="font-bold">Success</AlertTitle>
                  <AlertDescription>Your email has been verified</AlertDescription>
                </div>
              </Alert>
              )}
            </CardDescription>
          </CardContent>
          <CardFooter className="gap-10">
            <Link href="/">
              <Button>Back to home</Button>
            </Link>
          </CardFooter>
        </Card>
      </CardWrapper>
    </div>
  );
};

export default VerifyEmailForm;
