"use client";

import { Moon, SettingsIcon, Sun } from "lucide-react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useTheme } from "next-themes";

export default function Settings() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="absolute right-14 top-7" asChild>
        <Button size="icon">
          <SettingsIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <ColorThemeButton />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function ColorThemeButton() {
  const { theme, setTheme } = useTheme();

  return (
    <DropdownMenuItem
      className="gap-2"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      {theme === "dark" && (
        <>
          <Moon /> Dark theme
        </>
      )}
      {theme === "light" && (
        <>
          <Sun /> Light theme
        </>
      )}
    </DropdownMenuItem>
  );
}
