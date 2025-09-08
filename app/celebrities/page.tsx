import SectionHeader from "@/components/SectionHeader";
import VideoRail from "@/components/VideoRail";
import { getAllForCategory } from "@/lib/videos";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Celebrity Interviews & Exclusive Content",
  description: "Exclusive celebrity interviews featuring Mike Epps, George Benson, Jo Thompson, Montell Jordan, Mavis Staples, and more. Award-winning content from Pulsebeat Global.",
  keywords: [
    "celebrity interviews",
    "Mike Epps", 
    "George Benson",
    "Jo Thompson",
    "Montell Jordan",
    "Mavis Staples",
    "Malcolm-Jamal Warner",
    "exclusive interviews",
    "Detroit celebrities",
    "entertainment interviews"
  ],
  openGraph: {
    title: "Celebrity Interviews & Exclusive Content — Pulsebeat Global",
    description: "Exclusive celebrity interviews featuring Mike Epps, George Benson, Jo Thompson, Montell Jordan, Mavis Staples, and more.",
    type: "website",
  },
  twitter: {
    title: "Celebrity Interviews & Exclusive Content — Pulsebeat Global",
    description: "Exclusive celebrity interviews featuring Mike Epps, George Benson, Jo Thompson, Montell Jordan, Mavis Staples, and more.",
  },
};

export default function CelebritiesPage() {
  const items = getAllForCategory("celebrities");
  return (
    <div className="min-h-screen bg-pb-white dark:bg-black pt-20 page-transition">
      <SectionHeader title="Celebrities" subtitle="Spotlight on culture shapers." />
      <VideoRail title="Featured" items={items} layout="grid" size="featured" />
    </div>
  );
}