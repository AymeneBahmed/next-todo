"use client";
import { useState } from "react";
import Image from "next/image";
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
import hamburgerIcon from "../assets/burger-list-menu-com.svg";

const links = ["Home", "Pricing", "Features", "About", "Contact"];

export default function Navbar() {
  return (
    <>
      <div className="Hamburger">
        <HamburgerMenu />
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
    </>
  );
}

function HamburgerMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function toggleMenu() {
    setIsMenuOpen(!isMenuOpen);
  }

  return (
    <>
      <button onClick={toggleMenu}>
        <Image src={hamburgerIcon} width={45} alt="Hamburger Icon" />
      </button>
      <div
        className={`flex flex-col justify-center items-center fixed top-0 left-0  bg-slate-950 text-white w-[100%] h-full z-20 transform ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out`}
      >
        <ul className="flex flex-col justify-center  items-center relative">
          <li className="flex flex-col gap-3 fixed w-full justify-center items-center ">
            {links.map((link, index) => (
              <>
                {index !== 0 && (
                  <span className="bg-white bg-opacity-70 w-[65%] h-[0.1vh]"></span>
                )}
                <Link href="/">{link}</Link>
              </>
            ))}
          </li>
        </ul>
        <button
          className=" text-3xl absolute top-[2rem] right-[2rem]"
          onClick={toggleMenu}
        >
          X
        </button>
      </div>
    </>
  );
}
