"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  username: z
    .string()
    .min(3, { message: "Username must be at least of 3 characters" }),
  email: z.string().email(),
  password: z
    .string()
    .min(6, { message: "The password should contain at least 6 characters" }),
  agreeToTermsAndConditions: z.boolean().default(false),
});

export default function SignupPage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <div className="bg-blue-100 size-full grid place-content-center">
      <Card className="w-[25rem]">
        <CardHeader className="text-center">
          <CardTitle className="text-[2rem]">Sign Up</CardTitle>
          <CardDescription>Get ready to create todos</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form action="" onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="username"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl
                      className={`border-blue-400 border-2 ${
                        fieldState.invalid && "border-red-400 !ring-red-600"
                      }`}
                    >
                      <Input placeholder="Enter your username" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field, fieldState }) => (
                  <FormItem className="mt-5">
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
              <Button className="w-full mt-10" type="submit">
                Sign Up
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
