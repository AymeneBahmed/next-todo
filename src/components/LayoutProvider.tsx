"use client";

import { authRoutes } from "@/routes";
import Navbar from "./Navbar";
import { usePathname } from "next/navigation";
import { SessionProvider } from "next-auth/react";
import { useEffect, useState } from "react";

export default function LayoutProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const excludedRoutes: `/${string}`[] = [
    "/dashboard",
    "/dashboard/profile",
    ...authRoutes,
  ];
  const pathname = usePathname();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <></>;
  }

  return (
    <SessionProvider>
      {!excludedRoutes.includes(pathname as `/${string}`) && <Navbar />}
      {children}
    </SessionProvider>
  );
}
