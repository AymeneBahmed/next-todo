"use server";

import { db } from "@/db";
import { getUserByEmail } from "@/db/users";
import { LoginSchema, SignupSchema } from "@/lib/schemas";
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

    // TODO: Reimplement

    return { success: "Confirmation email sent!" };
  } catch (e) {
    console.log(e);

    return { error: "Something went wrong! Please, try again." };
  }
}

export async function verifyEmail(code: string): Promise<
  | {
      error:
        | "Verification code not found!"
        | "Account already verified!"
        | "Something went wrong!";
    }
  | { success: "Email verified successfully!" }
> {
  // TODO
  throw new Error("Unimplemented method");
}

export async function login(values: z.infer<typeof LoginSchema>) {
  try {
    const validatedFields = LoginSchema.safeParse(values);

    if (!validatedFields.success) {
      return { error: "Invalid fields" };
    }

    const data = validatedFields.data;
    const existingUser = await getUserByEmail(data.email);

    if (!existingUser) {
      return { error: "User does not exist!" };
    }

    // TODO: implemenet login
  } catch {
    return { error: "Somethgin went wrong!" };
  }
}
