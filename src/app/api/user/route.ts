import { getUserById } from "@/db/users";
import { auth } from "@/lib/auth";

export async function GET() {
  const session = await auth();

  if (!session?.user?.id) {
    return new Response(null, { status: 401 });
  }

  const user = await getUserById(session.user.id);

  return Response.json({
    ...user,
    uploadedImage: user?.uploadedImage?.toString("base64"),
  });
}
