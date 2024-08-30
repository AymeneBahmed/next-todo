"use client";

import { Fragment, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { PenBox } from "lucide-react";
import hamburgerIcon from "../assets/burger-list-menu-com.svg";
import { createPortal } from "react-dom";
import { useSession } from "next-auth/react";
import AvatarDropdownMenu from "./AvatarDropdownMenu";
import Avatar from "./Avatar";

const links = ["Home", "Pricing", "Features", "About", "Contact"];

export default function Navbar() {
  const session = useSession();

  return (
    <nav className="flex justify-between w-[80%] mt-4 p-3 rounded-xl max-[1050px]:w-[90%] fixed z-[99999] bg-white/80 backdrop-blur-md left-1/2 -translate-x-1/2">
      <HamburgerMenu />

      <Link
        href={"/"}
        className="uppercase text-xl font-bold flex items-center gap-2"
        scroll={false}
      >
        <Image
          src="/logo-no-background.svg"
          alt="logo"
          width={140}
          height={140}
        />
      </Link>

      <ul className="gap-10 max-[1050px]:hidden flex items-center">
        {links.map((link) => (
          <li key={link}>
            <Link
              href="/"
              className="hover:text-primary hover:underline underline-offset-[6px]"
            >
              {link}
            </Link>
          </li>
        ))}
      </ul>

      {session.data?.user ? (
        <AvatarDropdownMenu>
          <Avatar className="size-12" />
        </AvatarDropdownMenu>
      ) : (
        <div className="gap-4 flex">
          <Link href={"/login"}>
            <Button
              variant="outline"
              className="border-primary text-primary hover:bg-primary/5 hover:text-primary"
            >
              Login
            </Button>
          </Link>
          <Link href={"/signup"}>
            <Button>Sign Up</Button>
          </Link>
        </div>
      )}
    </nav>
  );
}

function HamburgerMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function toggleMenu() {
    setIsMenuOpen(!isMenuOpen);
  }

  return (
    <>
      <button onClick={toggleMenu} className="min-[1050px]:hidden">
        <Image src={hamburgerIcon} width={45} alt="Hamburger Icon" />
      </button>
      {createPortal(
        <div
          className={`flex flex-col justify-center items-center fixed top-0 left-0 ${
            isMenuOpen ? "translate-x-0" : "-translate-x-[2999px]"
          } bg-slate-950 text-white w-screen h-screen z-20 transform transition-transform duration-500 min-[1050px]:hidden`}
        >
          <ul className="flex flex-col w-5/6 justify-center items-center">
            <li className="flex flex-col gap-3 w-full justify-center items-center ">
              {links.map((link, index) => (
                <Fragment key={link}>
                  {index !== 0 && (
                    <span className="bg-white bg-opacity-70 w-[65%] h-[0.1vh]"></span>
                  )}
                  <Link href="/">{link}</Link>
                </Fragment>
              ))}
            </li>
          </ul>
          <button
            className="text-3xl absolute top-[2rem] right-[2rem]"
            onClick={toggleMenu}
          >
            X
          </button>
        </div>,
        document.body
      )}
    </>
  );
}
