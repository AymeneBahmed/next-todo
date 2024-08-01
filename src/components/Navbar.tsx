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
  );
}

export function HamburgerMenu() {
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
        className="Hamburger-container fixed w-[65vh] h-full z-20"
        style={{
          transform: isMenuOpen ? "translateX(0)" : "translateX(-100%)",
          transition: "transform 0.3s ease-in-out",
        }}
      >
        <ul className="flex flex-col justify-center  items-center relative">
          <li className="flex flex-col gap-3 fixed w-full justify-center items-center ">
            <a href="" className="mt-3">
              Home
            </a>
            <span className="separator"></span>
            <a href="" className="mt-3">
              Pricing
            </a>
            <span className="separator"></span>
            <a href="" className="mt-3">
              Features
            </a>
            <span className="separator"></span>
            <a href="" className="mt-3">
              About
            </a>
            <span className="separator"></span>
            <a href="" className="mt-3">
              Contact
            </a>
          </li>
        </ul>
        <button
          className="close-btn-navbar text-3xl absolute top-[2rem] right-[2rem]"
          onClick={toggleMenu}
        >
          X
        </button>
      </div>
    </>
  );
}
