import { Button } from "./ui/button";
import { FcGoogle } from "react-icons/fc";

export default function Social({ disabled }: { disabled: boolean }) {
  async function loginWithGoogle() {}

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
