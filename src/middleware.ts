import { MiddlewareConfig, NextRequest } from "next/server";
import { stackServerApp } from "./stack";
import { authRoutes } from "./routes";

export async function middleware(req: NextRequest) {
  const isAuthRoute = authRoutes.includes(req.nextUrl.pathname as `/${string}`);
  const isLoggedIn = await stackServerApp.getUser();

  if (isLoggedIn) {
    if (isAuthRoute) {
      return Response.redirect(new URL("/", req.nextUrl));
    }
  }
}

export const config: MiddlewareConfig = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
