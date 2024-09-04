"use client";

import { LogOut, User2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { signOut } from "next-auth/react";
import { cn } from "@/lib/utils";

export default function AvatarDropdownMenu({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  async function logout() {
    await signOut({ callbackUrl: "/" });
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className={cn(className)}>
        {children}
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
