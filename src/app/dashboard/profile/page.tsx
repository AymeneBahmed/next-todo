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
import FullNameField from "../../../components/profile/FullNameField";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import DeleteAccountDialog from "@/components/profile/DeleteAccountDialog";
import AvatarPicture from "@/components/profile/AvatarPicture";

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
            <div>
              <AvatarPicture />
            </div>

            <div className="space-y-6 mt-10">
              <FullNameField />

              <div>
                <div className="underline underline-offset-4">Email:</div>
                <div className="text-muted-foreground">
                  {session.user.email}
                </div>
              </div>
            </div>
          </CardContent>

          <CardFooter className="mt-6 flex-col gap-4">
            <LogoutButton className="w-full" />

            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full border-destructive text-red-600 hover:bg-destructive hover:text-white"
                >
                  Delete account
                </Button>
              </DialogTrigger>
              <DialogContent className="gap-2">
                <DeleteAccountDialog />
              </DialogContent>
            </Dialog>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}
