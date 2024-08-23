import { LogOut, User2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useUser } from "@stackframe/stack";

export default function AvatarDropdownMenu() {
  const user = useUser({ or: "throw" });

  async function logout() {
    await user.signOut();
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="bg-gradient-to-b from-blue-400 to-purple-400 size-10 rounded-[50%]"></div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[10rem]">
        <DropdownMenuItem className="gap-3">
          <User2 size={19} /> Profile
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="gap-3 text-destructive" onClick={logout}>
          <LogOut size={19} /> Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
