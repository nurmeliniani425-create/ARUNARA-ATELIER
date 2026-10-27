import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const demoSession = process.env.NODE_ENV === "development" && request.cookies.get("arunara_admin")?.value === "1";
  let neonSession = false;
  if (!demoSession && request.nextUrl.pathname.startsWith("/admin") && process.env.NEON_AUTH_BASE_URL) {
    try {
      const response = await fetch(`${process.env.NEON_AUTH_BASE_URL.replace(/\/$/, "")}/get-session`, { headers: { cookie: request.headers.get("cookie") || "" }, cache: "no-store" });
      const session = await response.json() as { user?: unknown; session?: { user?: unknown } } | null;
      neonSession = response.ok && Boolean(session?.user || session?.session?.user);
    } catch {
      neonSession = false;
    }
  }
  if (request.nextUrl.pathname.startsWith("/admin") && !demoSession && !neonSession) {
    const loginUrl = new URL("/loginadmin", request.url);
    loginUrl.searchParams.set("next", request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }
  return NextResponse.next();
}

export const config = { matcher: ["/admin/:path*"] };
