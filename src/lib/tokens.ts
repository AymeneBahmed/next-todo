import { db } from "@/db";
import { getVerificationTokenByToken } from "@/db/verification-tokens";
import { v4 as uuidV4 } from "uuid";

export async function generateVerificationToken(email: string) {
  const token = uuidV4();
  const expiresAt = new Date(new Date().getTime() + 3600 * 1000);

  const existingToken = await getVerificationTokenByToken(token);

  if (existingToken) {
    db.verificationToken.delete({
      where: {
        id: existingToken.id,
      },
    });
  }

  return await db.verificationToken.create({
    data: {
      token,
      email,
      expiresAt,
    },
  });
}
