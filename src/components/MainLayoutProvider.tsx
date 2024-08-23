"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";

export default function MainLayoutProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname() as (typeof excludedPaths)[number];
  const excludedPaths: `/${string}`[] = [
    "/login",
    "/signup",
    "/email-verification",
  ];

  return (
    <>
      {!excludedPaths.includes(pathname) && <Navbar />}
      {children}
    </>
  );
}
