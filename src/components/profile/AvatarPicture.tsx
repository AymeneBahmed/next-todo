"use client";

import { Camera } from "lucide-react";
import Avatar from "../Avatar";
import { FormEvent } from "react";
import { uploadUserImage } from "@/actions/profile";
import { useNotification } from "@/hooks/useNotification";
import { mutate } from "swr";

export default function AvatarPicture() {
  const notification = useNotification();

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const uploadState = await uploadUserImage(new FormData(e.currentTarget));

    if (uploadState.error) {
      notification.show({ message: uploadState.error, state: "error" });

      return;
    }

    if (uploadState.success) {
      mutate("/api/user");

      notification.show({ message: uploadState.success, state: "success" });
    }
  }

  return (
    <div className="relative size-min m-auto cursor-pointer">
      <Avatar className="size-28" />

      <form
        onSubmit={onSubmit}
        className="absolute left-0 top-0 bg-black/50 size-full rounded-full overflow-hidden opacity-0 hover:opacity-100 transition-opacity active:bg-black/60"
      >
        <label
          htmlFor="avatar"
          className="size-full cursor-pointer text-white flex flex-col justify-between"
        >
          <div className="grid place-content-center grow">
            <Camera size={35} />
          </div>

          <div className="flex flex-col items-center relative bottom-2">
            <hr className="w-full " />
            <div className="relative top-[0.1rem] font-semibold text-sm">
              Upload
            </div>
          </div>
        </label>

        <input
          type="file"
          hidden
          id="avatar"
          name="new-avatar"
          onChange={(e) => e.currentTarget.form?.requestSubmit()}
        />
      </form>
    </div>
  );
}
