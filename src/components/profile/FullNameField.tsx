"use client";

import { changeUserName } from "@/actions/profile";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNotification } from "@/hooks/useNotification";
import { LogOut, Pencil, Save } from "lucide-react";
import { useSession } from "next-auth/react";
import { useState, useTransition, FormEvent } from "react";

export default function FullNameField() {
  const [editMode, setEditMode] = useState(false);
  const [isPending, startTransition] = useTransition();
  const notification = useNotification();
  const session = useSession();

  function enterEditMode() {
    setEditMode(true);
  }

  function exitEditMode() {
    setEditMode(false);
  }

  function saveEditModeOnSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    startTransition(async () => {
      const newName = (
        new FormData(e.currentTarget).get("new-name") as string
      ).trim();
      const submissionState = await changeUserName(newName);

      if (submissionState.success) {
        await session.update({ name: newName });

        console.log(session.data?.user);

        notification.show({
          message: submissionState.success,
          state: "success",
        });
      } else if (submissionState.error) {
        notification.show({
          message: submissionState.error,
          state: "error",
        });
      }

      exitEditMode();
    });
  }

  return (
    <div className="flex justify-between items-center">
      {!editMode ? (
        <>
          <div>
            <div className="underline underline-offset-4">Full Name:</div>
            <div className="text-muted-foreground">
              {session.data?.user?.name}
            </div>
          </div>

          <Button
            aria-label="edit name"
            title="edit name"
            size="icon"
            onClick={enterEditMode}
          >
            <Pencil />
          </Button>
        </>
      ) : (
        <form
          className="flex justify-between items-end w-full"
          onSubmit={saveEditModeOnSubmit}
        >
          <div>
            <label htmlFor="new-name">Full Name:</label>
            <br />
            <Input
              id="new-name"
              name="new-name"
              className="h-7 py-4 border-black"
              defaultValue={session.data?.user?.name || ""}
              placeholder="Enter new name..."
            />
          </div>

          <div className="space-x-1">
            <Button
              aria-label="exit edit mode"
              title="exit edit mode"
              size="icon"
              disabled={isPending}
              onClick={exitEditMode}
              type="button"
            >
              <LogOut />
            </Button>

            <Button
              aria-label="save"
              title="save"
              size="icon"
              disabled={isPending}
              type="submit"
            >
              <Save />
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}
