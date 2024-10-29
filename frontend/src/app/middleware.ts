// middleware.ts (at root directory)
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const isAuth = req.nextauth.token;
    const isLoginPage = req.nextUrl.pathname === "/login";

    if (isAuth && isLoginPage) {
      return NextResponse.redirect(new URL("/landing", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ req, token }) => {
        const isLoginPage = req.nextUrl.pathname === "/login";
        
        if (isLoginPage) {
          return true;
        }

        return !!token;
      },
    },
  }
);

export const config = {
  matcher: [
    "/landing",
    "/dashboard/:path*",
    "/profile/:path*",
    "/settings/:path*",
    "/login"
  ],
};
