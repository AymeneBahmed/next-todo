"use client";

import { authRoutes } from "@/routes";
import Navbar from "./Navbar";
import { usePathname } from "next/navigation";
import { SessionProvider } from "next-auth/react";

export default function LayoutProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const excludedRoutes: `/${string}`[] = ["/dashboard", ...authRoutes];
  const pathname = usePathname();

  return (
    <>
      <SessionProvider>
        {!excludedRoutes.includes(pathname as `/${string}`) && <Navbar />}
        {children}
      </SessionProvider>
    </>
  );
}
