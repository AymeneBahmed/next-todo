import { Button } from "./ui/button";
import { FcGoogle } from "react-icons/fc";
import { signIn } from "next-auth/react";

export default function Social({ disabled }: { disabled: boolean }) {
  async function loginWithGoogle() {
    await signIn("google", { callbackUrl: "/dashboard" });
  }

  return (
    <Button
      className="w-full mt-3 gap-6"
      variant="secondary"
      size={"icon"}
      disabled={disabled}
      onClick={loginWithGoogle}
    >
      <FcGoogle size={19} />
      <div>Continue with Google</div>
    </Button>
  );
}
