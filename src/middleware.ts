import { NextRequest, NextResponse } from 'next/server';

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const session = !!req.cookies.get("next-auth.session-token");

  // Redirect to /account if a logged-in user tries to access sign-in or sign-up pages
  if (session && (path === '/login' || path === '/signup')) {
    return NextResponse.redirect(new URL('/account', req.url));
  }

  // Redirect to sign-in page if not logged in and trying to access protected routes
  if (!session && (path.startsWith('/account') || path.startsWith('/business'))) {
    return NextResponse.redirect(new URL(`/login?callbackUrl=${encodeURIComponent(path)}`, req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/account', 
    '/business/:path*',
    '/login',
    '/signup'
  ]
};
