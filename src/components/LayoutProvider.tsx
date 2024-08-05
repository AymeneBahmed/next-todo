"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";

export default function LayoutProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname() as (typeof excludedPaths)[number];
  const excludedPaths: `/${string}`[] = ["/login"];

  return (
    <>
      {!excludedPaths.includes(pathname) && <Navbar />}
      {children}
    </>
  );
}
