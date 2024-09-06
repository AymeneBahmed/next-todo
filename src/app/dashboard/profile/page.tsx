import Avatar from "@/components/Avatar";
import LogoutButton from "@/components/LogoutButton";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { auth } from "@/lib/auth";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  return (
    <>
      <Button className="absolute top-10 left-6 z-[1]" size="icon" asChild>
        <Link href="/dashboard" aria-label="Go back to todos">
          <ArrowLeft />
        </Link>
      </Button>

      <div className="relative flex justify-center items-center size-full">
        <Card className="w-[min(28rem,100%)]">
          <CardHeader className="text-center">
            <CardTitle>User Information</CardTitle>
            <CardDescription>Your personal information</CardDescription>
          </CardHeader>

          <CardContent>
            <Avatar className="size-28 m-auto" />

            <div className="space-y-6 mt-10">
              <div>
                <div>Full Name:</div>
                <div className="text-muted-foreground">{session.user.name}</div>
              </div>

              <div>
                <div>Email:</div>
                <div className="text-muted-foreground">
                  {session.user.email}
                </div>
              </div>
            </div>
          </CardContent>

          <CardFooter className="mt-6 flex-col gap-4">
            <LogoutButton className="w-full" />
            <Button
              variant="outline"
              className="w-full border-destructive text-red-600 hover:bg-destructive hover:text-white"
            >
              Delete account
            </Button>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}
