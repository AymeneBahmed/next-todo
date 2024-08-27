"use client";

import { authRoutes } from "@/routes";
import Navbar from "./Navbar";
import { usePathname } from "next/navigation";

export default function LayoutProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const excludedRoutes: `/${string}`[] = ["/dashboard", ...authRoutes];
  const pathname = usePathname();

  return (
    <>
      {!excludedRoutes.includes(pathname as `/${string}`) && <Navbar />}
      {children}
    </>
  );
}
