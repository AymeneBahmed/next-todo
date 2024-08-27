"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";

export default function Avatar({ className }: { className?: string }) {
  // TODO: implement
  return (
    <div
      className={cn(
        "bg-gradient-to-b from-blue-400 to-purple-400 rounded-[50%] relative overflow-hidden size-10",
        className
      )}
    >
      <Image src={""} alt="profile-picture" fill />
    </div>
  );
}
