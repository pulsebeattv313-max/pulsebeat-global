import SectionHeader from "@/components/SectionHeader";
import VideoRail from "@/components/VideoRail";
import { getAllForCategory } from "@/lib/videos";

export default function OriginalProgrammingPage() {
  const items = getAllForCategory("originals");
  return (
    <div className="min-h-screen bg-pb-white dark:bg-pb-gray-900 pt-20 page-transition">
      <SectionHeader title="Original Programming" subtitle="Exclusive shows and series." />
      <VideoRail title="All Shows" items={items} layout="grid" size="featured" />
    </div>
  );
}