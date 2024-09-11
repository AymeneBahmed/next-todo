"use client";

import { LogOut, User2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { signOut } from "next-auth/react";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function AvatarDropdownMenu({
  children,
  className,
  userFullName,
}: {
  children: React.ReactNode;
  className?: string;
  userFullName?: string;
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
        {userFullName && <DropdownMenuLabel>{userFullName}</DropdownMenuLabel>}

        <DropdownMenuItem asChild>
          <Link href="/dashboard/profile" className="gap-3">
            <User2 size={19} /> Profile
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="gap-3 text-destructive" onClick={logout}>
          <LogOut size={19} /> Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
