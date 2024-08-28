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
import { Button } from "./ui/button";
import { LoginSchema } from "@/lib/schemas";
import { login } from "@/app/actions/auth";
import FormError from "./FormError";
import { useState, useTransition } from "react";
import Link from "next/link";
import Social from "./Social";
import Divider from "./Divider";

export default function LoginForm() {
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
  });
  const [error, setError] = useState<string | null>();
  const [isPending, startTransition] = useTransition();

  async function onSubmit(values: z.infer<typeof LoginSchema>) {
    startTransition(async () => {
      const loginError = await login(values);

      if (loginError) {
        setError(loginError.error);

        return;
      }

      setError(null);
    });
  }

  return (
    <Card className="w-[27rem] border-[4px] border-primary">
      <CardHeader className="text-center">
        <CardTitle className="text-[2rem]">Login</CardTitle>
        <CardDescription className="relative -top-2">
          Get ready to create todos
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-0">
        <Social disabled={isPending} />

        <Divider text="or" />

        <Form {...form}>
          <form action="" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="email"
              render={({ field, fieldState }) => (
                <FormItem className="mt-2">
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
                  <div className="flex items-center justify-between">
                    <FormLabel>Password</FormLabel>
                    <Button
                      variant="link"
                      className="underline p-0 h-fit"
                      asChild
                    >
                      <Link href="/">Forgot password?</Link>
                    </Button>
                  </div>
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
            {error && <FormError message={error} />}
            <Button className="w-full mt-10" type="submit" disabled={isPending}>
              Login
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex justify-center mt-0">
        <div className="text-sm">
          Don&apos;t have an account?
          <Button variant="link" className="underline pl-1" asChild>
            <Link href="/signup">Sign up</Link>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
