"use server";

import { getUserByEmail } from "@/db/users";
import { createStackUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { SignupSchema } from "@/lib/schemas";
import { stackServerApp } from "@/stack";
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

export async function verifyEmail(code: string): Promise<
  | {
      error:
        | "Verification code not found!"
        | "Account already verified!"
        | "Something went wrong!";
    }
  | { success: "Email verified successfully!" }
> {
  const verificationError = await stackServerApp.verifyEmail(code);

  if (verificationError) {
    if (verificationError.errorCode === "VERIFICATION_CODE_NOT_FOUND") {
      return { error: "Verification code not found!" };
    }

    if (verificationError.errorCode === "VERIFICATION_CODE_ALREADY_USED") {
      return { error: "Account already verified!" };
    }

    return { error: "Something went wrong!" };
  }

  return { success: "Email verified successfully!" };
}
