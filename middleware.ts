import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
    async function middleware(req) {
        const token = req.nextauth.token;
        const { pathname } = req.nextUrl;
        
        if (!token) {
            return NextResponse.redirect(new URL("/auth", req.url));
        }

        if (pathname.startsWith("/admin") && token.email !== process.env.ADMIN_EMAIL) {
            return NextResponse.redirect(new URL("/", req.url));
        }

        return NextResponse.next();
    },
    {
        callbacks: {
            authorized: ({ token }) => !!token,
        },
    }
);

export const config = {
    matcher: ["/add-property", "/admin"],
};
