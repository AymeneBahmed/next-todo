import { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { LoginSchema } from "./schemas";
import { getUserByEmail } from "@/db/users";
import { compareSync } from "bcryptjs";

export default {
  providers: [
    Credentials({
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials);

        if (!validatedFields.success) {
          return null;
        }

        const { email, password } = validatedFields.data;
        const existingUser = await getUserByEmail(email);

        if (!existingUser || !existingUser.password) {
          return null;
        }

        if (!compareSync(password, existingUser.password)) {
          return null;
        }

        return existingUser;
      },
    }),
    Google,
  ],
} satisfies NextAuthConfig;
