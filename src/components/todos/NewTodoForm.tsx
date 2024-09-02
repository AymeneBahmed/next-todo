"use client";

import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import { useState, useTransition } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { NewTodoSchema } from "@/lib/schemas";
import { createTodo } from "@/actions/todo";
import { useNotification } from "@/hooks/useNotification";

export default function NewTodoInput() {
  const form = useForm<z.infer<typeof NewTodoSchema>>({
    defaultValues: {
      todo: "",
      priority: "low",
    },
    resolver: zodResolver(NewTodoSchema),
  });
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [isPending, startTransition] = useTransition();
  const notification = useNotification();

  async function onSubmit(values: z.infer<typeof NewTodoSchema>) {
    startTransition(async () => {
      const creationState = await createTodo(values);

      if (creationState.error) {
        notification.show({ message: creationState.error, state: "error" });

        return;
      }

      if (creationState.success) {
        notification.show({ message: creationState.success, state: "success" });
      }
    });
  }

  return (
    <div className="flex mb-10 relative">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className={`mx-auto inline-flex items-end border-2 border-transparent ${
            isInputFocused && "rounded-lg outline outline-[3px] outline-primary"
          }`}
        >
          <FormField
            name="todo"
            control={form.control}
            render={({ field }) => (
              <FormItem className="space-y-0">
                <FormLabel className="sr-only">New todo</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Add a new todo..."
                    className="rounded-r-none focus-visible:ring-0 focus-visible:ring-offset-0 w-[30rem]"
                    onFocus={() => setIsInputFocused(true)}
                    onBlur={() => setIsInputFocused(false)}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            name="priority"
            control={form.control}
            render={({ field }) => (
              <FormItem className="space-y-0">
                <FormLabel className="sr-only">Priority</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger
                      className="bg-green-400 rounded-none text-black border-none focus:ring-0 focus:ring-offset-0 focus:bg-green-500"
                      title="priority"
                    >
                      <SelectValue placeholder="P" />
                    </SelectTrigger>
                  </FormControl>

                  <SelectContent align="end">
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />

          <Button
            disabled={isPending}
            aria-label="add a todo"
            title="add"
            className="rounded-l-none p-3"
          >
            <Plus />
          </Button>
        </form>
      </Form>
    </div>
  );
}
