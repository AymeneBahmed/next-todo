"use server";

import { db } from "@/db";
import { getUserByEmail } from "@/db/users";
import { auth } from "@/lib/auth";

export async function changeUserName(newName: string) {
  if (newName.length === 0) {
    return { error: "Name can't be empty!" };
  }

  try {
    const session = await auth();

    if (!session?.user) {
      return {
        error: "No logged in user!",
      };
    }

    const existingUser = await getUserByEmail(session.user.email!);

    if (!existingUser) {
      throw new Error();
    }

    await db.user.update({
      where: { id: existingUser.id },
      data: { name: newName },
    });

    return { success: "Name edited successfully!" };
  } catch {
    return { error: "Something went wrong! Please try again." };
  }
}
