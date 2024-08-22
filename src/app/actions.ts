"use server";

import { getUserByEmail } from "@/db/users";
import { createStackUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { SignupSchema } from "@/lib/schemas";
import { z } from "zod";

export async function signup(values: z.infer<typeof SignupSchema>) {
  try {
    const validatedFields = SignupSchema.safeParse(values);

    if (!validatedFields.success) {
      return { error: "Invalid fields" };
    }

    const data = validatedFields.data;
    const existingUser = await getUserByEmail(data.email);

    if (existingUser) {
      return { error: "User already exists!" };
    }

    await db.user.create({
      data: {
        id: (await createStackUser(data.email, data.password)).user_id,
        email: data.email,
        firstName: data.firstName,
        username: data.username,
        lastName: !data.lastName ? null : data.lastName,
      },
    });

    return { success: "Confirmation email sent!" };
  } catch (e) {
    console.log(e);

    return { error: "Something went wrong! Please, try again." };
  }
}
