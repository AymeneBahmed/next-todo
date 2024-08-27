import { db } from ".";

export async function getUserByEmail(email: string) {
  try {
    return await db.user.findUnique({ where: { email } });
  } catch {
    return null;
  }
}
