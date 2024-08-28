"use server";

import { db } from "@/db";
import { getUserByEmail } from "@/db/users";
import { getVerificationTokenByToken } from "@/db/verification-tokens";
import { signIn } from "@/lib/auth";
import { sendEmailVerificationMail } from "@/lib/mails";
import { LoginSchema, SignupSchema } from "@/lib/schemas";
import { generateVerificationToken } from "@/lib/tokens";
import { hashSync } from "bcryptjs";
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
        email: data.email,
        name: `${data.firstName} ${data.lastName || ""}`,
        password: hashSync(data.password),
      },
    });

    sendEmailVerificationMail(
      data.email,
      (await generateVerificationToken(data.email)).token
    );

    return { success: "Confirmation email sent!" };
  } catch {
    return { error: "Something went wrong! Please, try again." };
  }
}

export async function verifyEmail(token: string) {
  try {
    const existingVerificationToken = await getVerificationTokenByToken(token);

    if (!existingVerificationToken) {
      return {
        error: "Verification token does not exist!",
      };
    }

    if (new Date() > new Date(existingVerificationToken.expiresAt)) {
      return { error: "Verification token has expired!" };
    }

    const existingUser = await getUserByEmail(existingVerificationToken.email);

    if (!existingUser) {
      return { error: "Email does not exist!" };
    }

    await db.user.update({
      where: {
        id: existingUser.id,
      },
      data: {
        emailVerified: new Date(),
      },
    });

    await db.verificationToken.delete({ where: { token } });

    return { success: "Email confirmed successfully!" };
  } catch {
    return {
      error:
        "Something went wrong! Please login again to get a new verification email.",
    };
  }
}

export async function login(values: z.infer<typeof LoginSchema>) {
  try {
    const validatedFields = LoginSchema.safeParse(values);

    if (!validatedFields.success) {
      return { error: "Invalid fields" };
    }

    const data = validatedFields.data;
    const existingUser = await getUserByEmail(data.email);

    if (!existingUser || !existingUser.password) {
      return { error: "Incorrect email or password!" };
    }

    if (!existingUser.emailVerified) {
      sendEmailVerificationMail(
        data.email,
        (await generateVerificationToken(data.email)).token
      );

      return { success: "Confirmation email sent!" };
    }

    await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirectTo: "/dashboard",
    });
  } catch {
    return { error: "Somethgin went wrong!" };
  }
}
