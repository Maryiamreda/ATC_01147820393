import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "../src/app/lib/session";

// Update protected and public routes
const protectedRoutes = ["/dashboard", "/my-bookings"];
const publicRoutes = ["/login", "/", "/register", "/create-account"];

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.some(route => path.startsWith(route));
  const isPublicRoute = publicRoutes.some(route => path === route);
  
  // @ts-ignore
  const cookie = cookies().get("session")?.value;
  const session = await decrypt(cookie);
  
  if (isProtectedRoute && !session?.userId) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  if (isPublicRoute && session?.userId) {
    return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
  }
  
  return NextResponse.next();
}