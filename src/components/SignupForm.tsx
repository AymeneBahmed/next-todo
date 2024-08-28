"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Checkbox } from "./ui/checkbox";
import Link from "next/link";
import { Button } from "./ui/button";
import { SignupSchema } from "@/lib/schemas";
import { signup } from "@/app/actions/auth";
import FormError from "./FormError";
import FormSuccess from "./FormSuccess";
import { useState, useTransition } from "react";
import Social from "./Social";
import Divider from "./Divider";

export default function SignupForm() {
  const form = useForm<z.infer<typeof SignupSchema>>({
    resolver: zodResolver(SignupSchema),
  });
  const [error, setError] = useState<string | null>();
  const [success, setSuccess] = useState<string | null>();
  const [isPending, startTransition] = useTransition();

  async function onSubmit(values: z.infer<typeof SignupSchema>) {
    startTransition(async () => {
      const signupState = await signup(values);

      if (signupState.error) {
        setError(signupState.error);
        setSuccess(null);

        return;
      }

      if (signupState.success) {
        setSuccess(signupState.success);
        setError(null);
      }
    });
  }

  return (
    <Card className="w-[27rem] border-[4px] border-primary">
      <CardHeader className="text-center">
        <CardTitle className="text-[2rem]">Sign Up</CardTitle>
        <CardDescription className="relative -top-2">
          Create an account
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-0">
        <Social disabled={isPending} />

        <Divider text="or" />

        <Form {...form}>
          <form action="" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex gap-5 [&>*]:w-[50%]">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl
                      className={`bg-gray-100 ${
                        fieldState.invalid && "border-red-400 !ring-red-600"
                      }`}
                    >
                      <Input placeholder="John" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel>
                      Last Name{" "}
                      <span className="text-gray-500 italic">(Optional)</span>
                    </FormLabel>
                    <FormControl
                      className={`bg-gray-100 ${
                        fieldState.invalid && "border-red-400 !ring-red-600"
                      }`}
                    >
                      <Input placeholder="Cena" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="email"
              render={({ field, fieldState }) => (
                <FormItem className="mt-5">
                  <FormLabel>Email</FormLabel>
                  <FormControl
                    className={`bg-gray-100 ${
                      fieldState.invalid && "border-red-400 !ring-red-600"
                    }`}
                  >
                    <Input
                      {...field}
                      type="email"
                      placeholder="Enter your gmail"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field, fieldState }) => (
                <FormItem className="mt-5">
                  <FormLabel>Password</FormLabel>
                  <FormControl
                    className={`bg-gray-100 ${
                      fieldState.invalid && "border-red-400 !ring-red-600"
                    }`}
                  >
                    <Input
                      type="password"
                      placeholder="Enter your password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="agreeToTermsAndConditions"
              render={({ field }) => (
                <FormItem className="mt-10 flex space-y-0 gap-2">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      required
                    />
                  </FormControl>
                  <FormLabel>
                    I agree to{" "}
                    <Link href="/" className="underline text-primary">
                      Terms and Conditions
                    </Link>
                  </FormLabel>
                </FormItem>
              )}
            />
            {error && <FormError message={error} />}
            {success && <FormSuccess message={success} />}
            <Button className="w-full mt-10" type="submit" disabled={isPending}>
              Sign Up
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex justify-center mt-0">
        <div className="text-sm">
          Already have an account?
          <Button variant="link" className="underline pl-1" asChild>
            <Link href="/login">Login</Link>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
