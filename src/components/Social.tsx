import { useStackApp } from "@stackframe/stack";
import { Button } from "./ui/button";
import { FcGoogle } from "react-icons/fc";

export default function Social({ disabled }: { disabled: boolean }) {
  const app = useStackApp();

  async function loginWithGoogle() {
    await app.signInWithOAuth("google");
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
      <div>Sign up with Google</div>
    </Button>
  );
}
