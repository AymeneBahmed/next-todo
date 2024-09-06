"use client";

import { signOut } from "next-auth/react";
import { Button, ButtonProps } from "./ui/button";

export default function LogoutButton({
  className,
  variant,
}: {
  className?: string;
  variant?: ButtonProps["variant"];
}) {
  return (
    <Button
      variant={variant}
      className={className}
      onClick={async () => await signOut({ callbackUrl: "/login" })}
    >
      Log out
    </Button>
  );
}
