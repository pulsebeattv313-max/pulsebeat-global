import { NextResponse } from "next/server";

export function GET() {
  const body = `User-agent: *\nAllow: /\nSitemap: ${process.env.NEXT_PUBLIC_SITE_URL || "https://www.pulsebeatglobal.com"}/sitemap.xml`;
  return new NextResponse(body, { headers: { "Content-Type": "text/plain" } });
}