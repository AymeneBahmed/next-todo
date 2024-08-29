import { db } from "@/db";
import { auth } from "@/lib/auth";

export async function GET() {
  const session = await auth();
  console.log(session?.user);

  if (!session?.user?.id) {
    return new Response(null, { status: 401 });
  }

  return Response.json(
    (await db.todo.findMany({ where: { userId: session.user.id } })).sort(
      (a, b) => a.order - b.order
    )
  );
}
