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
import { useState } from "react";



const links = ["Home", "Pricing", "Features", "About", "Contact"];

export default function Navbar() {



  return (
    <NavigationMenu className="p-4 max-w-[80%] left-1/2 -translate-x-1/2 gap-10 justify-around">
      <NavigationMenuList>
        <HamburgerMenu></HamburgerMenu>
        <Link href={"/"} passHref legacyBehavior>
          <NavigationMenuLink className="uppercase text-xl font-bold flex items-center gap-2">
            <PenBox />
            Todo
          </NavigationMenuLink>
        </Link>
      </NavigationMenuList>

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

function HamburgerMenu() {

 
 return(
 
<div className="Hamburger-container">
<a href="">Home</a>
<a href="">Pricing</a>
<a href="">Pricing</a>
<a href="">Pricing</a>
<a href="">Pricing</a>
<button>X</button>

</div>
 
 ) 
}
/*const [menuOpen, setMenuOpen] = useState(false);

function toggleMenu (){
 setMenuOpen((menuOpen)=> !menuOpen);
}
 */