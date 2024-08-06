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
import { Checkbox } from "./ui/checkbox";
import Link from "next/link";
import { Button } from "./ui/button";

const formSchema = z.object({
  firstName: z
    .string()
    .min(1, { message: "The name should contain at least 1 character" }),
  lastName: z.string().optional(),
  username: z
    .string()
    .min(3, { message: "Username must be at least of 3 characters" }),
  email: z.string().email(),
  password: z
    .string()
    .min(6, { message: "The password should contain at least 6 characters" }),
  agreeToTermsAndConditions: z.boolean().default(false),
});

export default function SignupForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <div className="bg-blue-100 size-full grid place-content-center">
      <Card className="w-[27rem]">
        <CardHeader className="text-center">
          <CardTitle className="text-[2rem]">Sign Up</CardTitle>
          <CardDescription>Get ready to create todos</CardDescription>
        </CardHeader>
        <CardContent>
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
                        className={`border-blue-400 border-2 ${
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
                        className={`border-blue-400 border-2 ${
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
                name="username"
                render={({ field, fieldState }) => (
                  <FormItem className="mt-5">
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
