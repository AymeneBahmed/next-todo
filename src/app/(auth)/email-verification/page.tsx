"use client";

import { verifyEmail } from "@/actions/auth";
import FormError from "@/components/FormError";
import FormSuccess from "@/components/FormSuccess";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { PuffLoader } from "react-spinners";

export default function EmailVerificationPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [error, setError] = useState<string | null>();
  const [success, setSuccess] = useState<string | null>();

  useEffect(() => {
    (async () => {
      if (!token) {
        setError("Missing verification token");
        setSuccess(null);

        return;
      }

      const verificationState = await verifyEmail(token);

      if ("error" in verificationState) {
        setError(verificationState.error);
        setSuccess(null);
      } else {
        setSuccess(verificationState.success);
        setError(null);
      }
    })();
  }, [token]);

  return (
    <Card className="w-[24rem]">
      <CardHeader className="text-center">
        <CardTitle>Verifying your email</CardTitle>
        {!error && !success && (
          <CardDescription>Please wait...</CardDescription>
        )}
      </CardHeader>
      <CardContent className="flex justify-center">
        {!error && !success && <PuffLoader color="blue" className="my-10" />}
        {error && <FormError message={error} />}
        {success && <FormSuccess message={success} />}
      </CardContent>
      <CardFooter className="flex justify-center ">
        <Button asChild variant="link" className="underline">
          <Link href="/login">Back to login</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
