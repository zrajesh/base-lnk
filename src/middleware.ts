import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 

export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;
    const isPublicPath = path === "/login" || path === "/signup";
    const isVerifyPath = path === "/verifyemail";
    const isHomePath = path === "/";
    const token = request.cookies.get("token")?.value || "";
    if (isPublicPath && token) {
        return NextResponse.redirect(new URL("/dashboard", request.url));
    }
    if (!isPublicPath && !token && !isHomePath) {
        return NextResponse.redirect(new URL("/login", request.url));
    }
}
 
export const config = {
  matcher: [
    "/",
    "/user/:path*",
    "/login",
    "/signup",
    "/verifyemail",
    "/dashboard"
  ],
}