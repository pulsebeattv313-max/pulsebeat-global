import { NextResponse } from "next/server";

export function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.pulsebeatglobal.com";
  const body = `User-agent: *
Allow: /

# Disallow admin and private areas
Disallow: /admin/
Disallow: /api/
Disallow: /_next/
Disallow: /private/

# Allow important pages
Allow: /celebrities
Allow: /original-programming
Allow: /news-culture
Allow: /about
Allow: /team
Allow: /partners
Allow: /contact
Allow: /donate

# Sitemap location
Sitemap: ${baseUrl}/sitemap.xml

# Crawl delay for respectful crawling
Crawl-delay: 1`;
  
  return new NextResponse(body, { 
    headers: { 
      "Content-Type": "text/plain",
      "Cache-Control": "public, max-age=86400" // Cache for 24 hours
    } 
  });
}