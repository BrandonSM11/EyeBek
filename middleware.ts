import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  
  console.log("Token:", token);
  console.log("Role:", token?.role);

  if (!token) {
    console.log("No hay token, redirigiendo...");
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (token?.role !== "administrator") {
    console.log("Role no es administrator, es:", token?.role);
    return NextResponse.redirect(new URL("/", req.url));
  }

  console.log("Acceso permitido");
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard_company", "/dashboard_company/:path*"],
};