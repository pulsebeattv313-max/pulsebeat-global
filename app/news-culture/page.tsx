import SectionHeader from "@/components/SectionHeader";
import VideoRail from "@/components/VideoRail";
import { getAllForCategory } from "@/lib/videos";

export default function NewsCulturePage() {
  const items = getAllForCategory("culture");
  return (
    <div className="min-h-screen bg-pb-white dark:bg-pb-gray-900 pt-20 page-transition">
      <SectionHeader title="News & Culture" subtitle="The pulse of what&rsquo;s happening now." />
      <VideoRail title="Latest" items={items} layout="grid" size="featured" />
    </div>
  );
}