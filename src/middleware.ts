// middleware.ts
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

// Define routes that should be restricted for logged-in users
const restrictedRoutes = ["/signup"];

export default withAuth(
  async function middleware(req) {
    const url = req.nextUrl.clone();
    const isAuthenticated = !!req.nextauth.token;

    // If the user is authenticated and trying to access a restricted route
    if (isAuthenticated && restrictedRoutes.includes(url.pathname)) {
      // Redirect them to the homepage or any other route
      url.pathname = "/";
      return NextResponse.redirect(url);
    }

    // Continue with the request
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token, // Use your logic to check if the user is authenticated
    },
  }
);

export const config = {
  matcher: ["/business/:path*", "/account/"],
};
