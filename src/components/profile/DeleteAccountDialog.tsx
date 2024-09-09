"use client";

import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { DialogClose, DialogHeader, DialogTitle } from "../ui/dialog";
import { Input } from "../ui/input";
import { z } from "zod";
import { DeleteAccountSchema } from "@/lib/schemas";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { deleteAccount } from "@/actions/profile";
import FormError from "../FormError";
import { signOut } from "next-auth/react";
import FormSuccess from "../FormSuccess";

export default function DeleteAccountDialog() {
  const form = useForm<z.infer<typeof DeleteAccountSchema>>({
    resolver: zodResolver(DeleteAccountSchema),
  });
  const [error, setError] = useState<string>();
  const [success, setSuccess] = useState<string>();
  const [isPending, starTransition] = useTransition();

  function onSubmit(values: z.infer<typeof DeleteAccountSchema>) {
    starTransition(async () => {
      const deletionState = await deleteAccount(values);

      if (deletionState.error) {
        setError(deletionState.error);
        setSuccess(undefined);

        return;
      }

      if (deletionState.success) {
        setError(undefined);
        setSuccess(deletionState.success);

        await signOut();
      }
    });
  }

  return (
    <>
      <DialogHeader>
        <DialogTitle>Are you sure you want to delete account?</DialogTitle>
      </DialogHeader>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="email"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel className="text-gray-500">
                  Enter your email to confirm deletion:
                </FormLabel>
                <FormControl
                  className={`bg-gray-100 ${
                    fieldState.invalid && "border-red-400 !ring-red-600"
                  }`}
                >
                  <Input
                    {...field}
                    placeholder="example@domain.com"
                    type="email"
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {error && <FormError message={error} />}
          {success && <FormSuccess message={success} />}

          <div className="flex justify-end mt-6 gap-2">
            <DialogClose>
              <Button disabled={isPending} type="button">
                Cancel
              </Button>
            </DialogClose>

            <Button disabled={isPending} variant="destructive">
              Delete
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
}
