"use client";

import { LogOut, User2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useUser } from "@stackframe/stack";
import Image from "next/image";
import { cn } from "@/lib/utils";

export default function AvatarDropdownMenu({
  size,
}: {
  size?: `${number}px` | `${number}rem`;
}) {
  const user = useUser({ or: "redirect" });

  async function logout() {
    await user.signOut();
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div
          className={cn(
            "bg-gradient-to-b from-blue-400 to-purple-400 rounded-[50%] relative overflow-hidden",
            !size && "size-10"
          )}
          style={{ width: size, height: size }}
        >
          {user.profileImageUrl && (
            <Image src={user.profileImageUrl} alt="profile-picture" fill />
          )}
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[10rem]">
        <DropdownMenuItem className="gap-3">
          <User2 size={19} /> Profile
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="gap-3 text-destructive" onClick={logout}>
          <LogOut size={19} /> Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
