import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://www.pulsebeatglobal.com";
  const now = new Date();
  
  const routes = [
    {
      url: `${base}/`,
      lastModified: now,
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },
    {
      url: `${base}/celebrities`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${base}/original-programming`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${base}/news-culture`,
      lastModified: now,
      changeFrequency: 'daily' as const,
      priority: 0.8,
    },
    {
      url: `${base}/about`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: `${base}/team`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      url: `${base}/partners`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      url: `${base}/contact`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${base}/donate`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
  ];
  
  return routes;
}