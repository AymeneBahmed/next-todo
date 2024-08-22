"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Card,
  CardContent,
  CardDescription,
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
import { login } from "@/app/actions";
import FormError from "./FormError";
import { useState, useTransition } from "react";

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
        <CardDescription>Get ready to create todos</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form action="" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="email"
              render={({ field, fieldState }) => (
                <FormItem className="mt-2">
                  <FormLabel>Email</FormLabel>
                  <FormControl
                    className={`border-blue-400 border-2 ${
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
                    className={`border-blue-400 border-2 ${
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
    </Card>
  );
}
