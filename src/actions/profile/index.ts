"use server";

import { db } from "@/db";
import { getUserByEmail } from "@/db/users";
import { auth } from "@/lib/auth";
import { DeleteAccountSchema } from "@/lib/schemas";
import { z } from "zod";

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

export async function deleteAccount(
  values: z.infer<typeof DeleteAccountSchema>
) {
  const validatedFields = DeleteAccountSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  try {
    const session = await auth();

    if (!session?.user?.email) {
      return {
        error: "User not logged in!",
      };
    }

    if (session.user.email !== validatedFields.data.email) {
      return { error: "Incorrect email!" };
    }

    const existingUser = await getUserByEmail(validatedFields.data.email);

    if (!existingUser) {
      return {
        error: "User doesn't exist!",
      };
    }

    await db.user.delete({
      where: { id: existingUser.id },
    });

    return { success: "Account deleted successfully!" };
  } catch {
    return { error: "Something went wrong! Please try again." };
  }
}

export async function uploadUserImage(formData: FormData) {
  try {
    const uploadedImage = formData.get("new-avatar") as File;
    const arrayBuffer = await uploadedImage.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const session = await auth();

    if (!session?.user?.id) {
      throw new Error();
    }

    await db.user.update({
      where: { id: session.user.id },
      data: { uploadedImage: buffer, uploadedImageType: uploadedImage.type },
    });

    return { success: "Profile picture updated successfully!" };
  } catch {
    return { error: "Something went wrong! Please try again." };
  }
}
