import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function proxy(req: NextRequest) {
    const protectedPage = ['/cart', '/wishlist']
    const authPage = ['/login', '/register']

    // get path
    const pathName = req.nextUrl.pathname

    // get token => get token

    const myToken = await getToken({
        req: req,
        secret: process.env.NEXTAUTH_SECRET,
        secureCookie: process.env.NODE_ENV === 'production'
    })

    const accessToken = myToken?.token

    if (!accessToken && protectedPage.some((path) => pathName.startsWith(path))) {
        return NextResponse.redirect(new URL('/login', req.nextUrl))
    }

    if(accessToken && authPage.some((path)=> pathName.startsWith(path) )){
        return NextResponse.redirect(new URL('/', req.nextUrl))
    }

    return NextResponse.next()
}

export const config = {
  matcher: [
    "/cart/:path*",
    "/wishlist/:path*",
    "/login/:path*",
    "/register/:path*",
  ],
};