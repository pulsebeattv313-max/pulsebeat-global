import SectionHeader from "@/components/SectionHeader";
import VideoRail from "@/components/VideoRail";
import { getAllForCategory } from "@/lib/videos";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Original Programming & Award-Winning Shows",
  description: "Emmy-nominated and NABJ award-winning original programming featuring PULSEBEAT WITH GREG DUNMORE. Exclusive shows you can't find anywhere else.",
  keywords: [
    "original programming",
    "PULSEBEAT WITH GREG DUNMORE",
    "Emmy nominated",
    "NABJ award",
    "award-winning shows",
    "Detroit TV",
    "ABC WMYD",
    "TV33 WHPR",
    "Greg Dunmore",
    "television programming"
  ],
  openGraph: {
    title: "Original Programming & Award-Winning Shows — Pulsebeat Global",
    description: "Emmy-nominated and NABJ award-winning original programming featuring PULSEBEAT WITH GREG DUNMORE.",
    type: "website",
  },
  twitter: {
    title: "Original Programming & Award-Winning Shows — Pulsebeat Global",
    description: "Emmy-nominated and NABJ award-winning original programming featuring PULSEBEAT WITH GREG DUNMORE.",
  },
};

export default function OriginalProgrammingPage() {
  const items = getAllForCategory("originals");
  return (
    <div className="min-h-screen bg-pb-white dark:bg-black pt-20 page-transition">
      <SectionHeader title="Original Programming" subtitle="Exclusive shows and series." />
      <VideoRail title="All Shows" items={items} layout="grid" size="featured" />
    </div>
  );
}