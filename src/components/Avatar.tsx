"use client";

import { cn, fetcher } from "@/lib/utils";
import { User } from "@prisma/client";
import Image from "next/image";
import useSWR from "swr";

export default function Avatar({ className }: { className?: string }) {
  const { data: user, isLoading } = useSWR<
    Pick<User, "image" | "uploadedImageType"> & { uploadedImage?: string }
  >("/api/user", fetcher);

  return (
    <div
      className={cn(
        "bg-gradient-to-b from-blue-400 to-purple-400 rounded-[50%] relative overflow-hidden size-10",
        className
      )}
    >
      {!isLoading && (user?.image || user?.uploadedImage) && (
        <Image
          src={
            user.uploadedImage
              ? `data:${user.uploadedImageType};base64,${user.uploadedImage}`
              : user.image!
          }
          alt="profile picture"
          fill
          className="object-cover"
        />
      )}
    </div>
  );
}
