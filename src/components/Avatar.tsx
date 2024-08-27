"use client";

import { cn } from "@/lib/utils";
import { useUser } from "@stackframe/stack";
import Image from "next/image";

export default function Avatar({ className }: { className?: string }) {
  const user = useUser({ or: "redirect" });

  return (
    <div
      className={cn(
        "bg-gradient-to-b from-blue-400 to-purple-400 rounded-[50%] relative overflow-hidden size-10",
        className
      )}
    >
      {user.profileImageUrl && (
        <Image src={user.profileImageUrl} alt="profile-picture" fill />
      )}
    </div>
  );
}
