import authConfig from "@/lib/auth.config";
import { ProxyConfig } from "next/server";
import NextAuth from "next-auth";
import { authRoutes, protectedRoutes } from "./routes";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const isLoggedIn = !!req.auth;

  const isProtectedRoute = protectedRoutes.includes(
    req.nextUrl.pathname as `/${string}`,
  );
  const isAuthRoute = authRoutes.includes(req.nextUrl.pathname as `/${string}`);

  if (!isLoggedIn) {
    if (isProtectedRoute) {
      return Response.redirect(new URL("/signup", req.nextUrl));
    }

    return;
  }

  if (isAuthRoute) {
    return Response.redirect(new URL("/dashboard", req.nextUrl));
  }

  return;
});

export const config: ProxyConfig = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
