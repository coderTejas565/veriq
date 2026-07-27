import { auth } from "@/lib/auth/auth";
import { NextResponse } from "next/server";

export async function proxy(request: Request) {
  const session = await auth.api.getSession({
    headers: request.headers,
  });

  const pathname = new URL(request.url).pathname;

  if (pathname.startsWith("/notebooks") && !session) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/notebooks/:path*"],
};
