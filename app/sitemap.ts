import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://pulsebeat.example.com";
  const routes = ["", "/celebrities", "/original-programming", "/news-culture", "/about", "/team", "/partners", "/contact", "/donate"];
  return routes.map((r) => ({
    url: `${base}${r || "/"}`,
    lastModified: new Date(),
  }));
}