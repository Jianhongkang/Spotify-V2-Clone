import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export const config = {
  matcher: "/",
  };

export async function middleware(req) {
  const token = await getToken({ req, secret: process.env.JWT_SECRET });
  const { pathname,origin } = req.nextUrl;
  const url=`${origin}/login`
  if (pathname.includes("/api/auth") || token) {
    return NextResponse.next();
  }
  if (!token && pathname !=='/login') {
    // return NextResponse.redirect(url)

    const url = req.nextUrl.clone();
    url.pathname = '/login'
    return NextResponse.redirect(url)
}
}

