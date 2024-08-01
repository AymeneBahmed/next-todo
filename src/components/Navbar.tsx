"use client";
import { useState } from "react";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import { Button } from "./ui/button";
import { PenBox } from "lucide-react";

const links = ["Home", "Pricing", "Features", "About", "Contact"];

export default function Navbar() {
  return (
    <div className="flex items-center  justify-between ">
      <div className="Hamburger  ">
        <HamburgerMenu></HamburgerMenu>
      </div>

      <NavigationMenu className="p-4 max-w-[80%] left-1/2 -translate-x-1/2 gap-10 justify-around">
        <NavigationMenuList>
          <Link href={"/"} passHref legacyBehavior>
            <NavigationMenuLink className="uppercase text-xl font-bold flex items-center gap-2">
              <PenBox />
              Todo
            </NavigationMenuLink>
          </Link>
        </NavigationMenuList>
        <div className="respinsive-navbar">
          <NavigationMenuList className="gap-10">
            {links.map((link) => (
              <NavigationMenuItem key={link}>
                <Link href="/" passHref legacyBehavior>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    {link}
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </div>
        <NavigationMenuList className="gap-4">
          <NavigationMenuItem>
            <Button
              variant="outline"
              className="border-primary text-primary hover:bg-primary/5 hover:text-primary"
            >
              Login
            </Button>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Button>Sign Up</Button>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}

function HamburgerMenu() {
  const [menuOpen, setMenuOpen] = useState(false);

  function toggleMenu() {
    setMenuOpen((menuOpen) => !menuOpen);
  }

  function rm() {
    const hamburgerContainer = document.querySelector(".Hamburger-container");
    hamburgerContainer?.classList.remove("hidden");
  }

  return (
    <>
      <button onClick={toggleMenu}>
        click
        <div
          className={`Hamburger-container hidden w-96 h-full  z-20 ${
            menuOpen ? "menu-open" : ""
          }`}
        >
          <ul className=" flex flex-col justify-center items-center relative">
            <li className=" flex flex-col  gap-7 fixed">
              <a href="">Home</a>
              <a href="">Pricing</a>
              <a href="">Pricing</a>
              <a href="">Pricing</a>
              <a href="">Pricing</a>
            </li>
          </ul>
          <button
            className="close-btn-navbar text-3xl absolute top-[2rem] right-[2rem] "
            onClick={rm}
          >
            X
          </button>
        </div>
      </button>
    </>
  );
}
