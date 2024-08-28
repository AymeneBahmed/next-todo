"use client";

import { cn } from "@/lib/utils";
import { useSession } from "next-auth/react";
import Image from "next/image";

export default function Avatar({ className }: { className?: string }) {
  const session = useSession();

  return (
    <div
      className={cn(
        "bg-gradient-to-b from-blue-400 to-purple-400 rounded-[50%] relative overflow-hidden size-10",
        className
      )}
    >
      {session.data?.user?.image && (
        <Image src={session.data.user.image} alt="profile-picture" fill />
      )}
    </div>
  );
}
