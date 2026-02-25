import { NextResponse, type NextRequest } from "next/server";

const clerkPublishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
const SESSION_COOKIE = "humanhomes_dev_session";

export default async function middleware(request: NextRequest) {
  // Dev mode: no Clerk keys, use simple session check
  if (!clerkPublishableKey) {
    const { pathname } = request.nextUrl;

    // Sign-in/sign-up routes redirect to dev login
    if (pathname.startsWith("/sign-in") || pathname.startsWith("/sign-up")) {
      return NextResponse.redirect(new URL("/dev-login", request.url));
    }

    // Public routes: always accessible
    const publicRoutes = ["/", "/dev-login", "/about", "/how-it-works", "/privacy", "/terms"];
    if (publicRoutes.some((route) => pathname === route)) {
      return NextResponse.next();
    }

    // Protected routes: require dev session cookie.
    const hasDevSession = request.cookies.get(SESSION_COOKIE)?.value === "true";
    if (!hasDevSession) {
      const url = new URL("/dev-login", request.url);
      url.searchParams.set("redirect", pathname);
      return NextResponse.redirect(url);
    }

    return NextResponse.next();
  }

  // With Clerk keys, use full auth middleware
  const { clerkMiddleware, createRouteMatcher } = await import(
    "@clerk/nextjs/server"
  );
  const isPublicRoute = createRouteMatcher([
    "/",
    "/sign-in(.*)",
    "/sign-up(.*)",
  ]);

  return clerkMiddleware(async (auth, req) => {
    if (!isPublicRoute(req)) {
      await auth.protect();
    }
  })(request, {} as any);
}

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
