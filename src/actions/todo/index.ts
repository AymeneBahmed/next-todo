"use server";

import { db } from "@/db";
import { getUserByEmail } from "@/db/users";
import { auth } from "@/lib/auth";
import { NewTodoSchema } from "@/lib/schemas";
import { Priority, Todo } from "@prisma/client";
import { z } from "zod";

export async function createTodo(values: z.infer<typeof NewTodoSchema>) {
  try {
    const session = await auth();

    if (!session?.user?.email) {
      throw new Error("User not found");
    }

    const user = await getUserByEmail(session.user.email);

    if (!user) {
      throw new Error("User not found");
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
            order: (await db.todo.count()) + 1,
          },
        },
      },
    });

    return { success: "Added a new todo!" };
  } catch {
    return { error: "Something went wrong! Please try again." };
  }
}

export async function updateTodos(newData: Todo[]) {
  await Promise.all(
    newData.map((todo) =>
      db.todo.update({
        where: { id: todo.id },
        data: todo,
      })
    )
  );
}
