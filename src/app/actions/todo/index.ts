"use server";

import { db } from "@/db";
import { getUserByEmail } from "@/db/users";
import { auth } from "@/lib/auth";
import { NewTodoSchema } from "@/lib/schemas";
import { Priority } from "@prisma/client";
import { z } from "zod";

export async function createTodo(values: z.infer<typeof NewTodoSchema>) {
  try {
    const session = await auth();

    if (!session?.user?.email) {
      throw Error;
    }

    const user = await getUserByEmail(session.user.email);

    if (!user) {
      throw Error;
    }

    const validatedFields = NewTodoSchema.safeParse(values);

    if (!validatedFields.success) {
      return { error: "Invalid fields!" };
    }

    const { todo, priority } = validatedFields.data;

    await db.user.update({
      where: {
        email: user.email,
      },
      data: {
        Todo: {
          create: {
            title: todo,
            priority: priority.toUpperCase() as Priority,
          },
        },
      },
    });

    return { success: "Added a new todo!" };
  } catch {
    return { error: "Something went wrong! Please try again." };
  }
}
