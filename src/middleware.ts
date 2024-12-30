import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req });
  const { pathname } = req.nextUrl;

  // If token exists, restrict access to /sign-in and /sign-up
  if (
    token &&
    (pathname.startsWith("/sign-in") || pathname.startsWith("/sign-up"))
  ) {
    return NextResponse.redirect(new URL("/", req.nextUrl));
  }

  // If token does not exist, protect access to the root (/) route
  if (!token && pathname === "/") {
    return NextResponse.redirect(new URL("/sign-in", req.nextUrl));
  }

  // Allow all other routes and requests to proceed
  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/sign-in", "/sign-up"],
};
