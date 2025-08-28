import SectionHeader from "@/components/SectionHeader";
import VideoRail from "@/components/VideoRail";
import { getAllForCategory } from "@/lib/videos";

export default function CelebritiesPage() {
  const items = getAllForCategory("celebrities");
  return (
    <div className="min-h-screen bg-pb-black pt-20 page-transition">
      <SectionHeader title="Celebrities" subtitle="Spotlight on culture shapers." />
      <VideoRail title="Featured" items={items} layout="grid" size="featured" />
    </div>
  );
}