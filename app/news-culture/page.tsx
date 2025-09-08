import SectionHeader from "@/components/SectionHeader";
import VideoRail from "@/components/VideoRail";
import { getAllForCategory } from "@/lib/videos";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "News & Culture - Detroit Entertainment & Arts",
  description: "Stay ahead with trending Detroit culture, entertainment news, and cultural programming. Featuring Dr. Ossian Sweet, Detroit music, and community stories.",
  keywords: [
    "Detroit culture",
    "entertainment news",
    "cultural programming",
    "Dr. Ossian Sweet",
    "Detroit music",
    "community news",
    "cultural stories",
    "Detroit entertainment",
    "arts and culture",
    "local news"
  ],
  openGraph: {
    title: "News & Culture - Detroit Entertainment & Arts — Pulsebeat Global",
    description: "Stay ahead with trending Detroit culture, entertainment news, and cultural programming.",
    type: "website",
  },
  twitter: {
    title: "News & Culture - Detroit Entertainment & Arts — Pulsebeat Global",
    description: "Stay ahead with trending Detroit culture, entertainment news, and cultural programming.",
  },
};

export default function NewsCulturePage() {
  const items = getAllForCategory("culture");
  return (
    <div className="min-h-screen bg-pb-white dark:bg-black pt-20 page-transition">
      <SectionHeader title="News & Culture" subtitle="The pulse of what&rsquo;s happening now." />
      <VideoRail title="Latest" items={items} layout="grid" size="featured" />
    </div>
  );
}