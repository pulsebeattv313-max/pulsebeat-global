"use client";
import { useState, useEffect } from "react";
import VideoCard from "./VideoCard";

type TrendingItem = {
  id?: string;
  youTubeId: string;
  title: string;
  category: string;
  views: string;
  timeAgo: string;
};

type Props = {
  items: TrendingItem[];
  title?: string;
};

export default function TrendingSection({ items, title = "Trending Now" }: Props) {
  const [activeTab, setActiveTab] = useState<"all" | "celebrities" | "originals" | "culture">("all");
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  if (!mounted) {
    return (
      <section className="mx-auto max-w-7xl px-4 lg:px-8 mt-20">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-pb-gray-800 rounded w-1/4"></div>
          <div className="h-64 bg-pb-gray-800 rounded"></div>
        </div>
      </section>
    );
  }

  const tabs = [
    { id: "all", label: "All", count: items.length },
    { id: "celebrities", label: "Celebrities", count: items.filter(i => i.category === "celebrities").length },
    { id: "originals", label: "Originals", count: items.filter(i => i.category === "originals").length },
    { id: "culture", label: "Culture", count: items.filter(i => i.category === "culture").length },
  ];

  const filteredItems = activeTab === "all" 
    ? items 
    : items.filter(item => item.category === activeTab);

  return (
    <section className="mx-auto max-w-7xl px-4 lg:px-8 mt-20">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-pb-accent via-pb-gold to-pb-purple-light flex items-center justify-center">
              <svg className="w-4 h-4 text-pb-black" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold font-heading text-pb-white">
              {title}
            </h2>
          </div>
          <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-pb-accent/20 border border-pb-accent/30">
            <div className="w-2 h-2 bg-pb-accent rounded-full animate-pulse"></div>
            <span className="text-xs font-semibold text-pb-accent">LIVE</span>
          </div>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2 mb-8 border-b border-pb-gray-700">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-6 py-3 text-sm font-semibold rounded-t-lg transition-all duration-200 ${
              activeTab === tab.id
                ? "bg-pb-gold text-pb-black border-b-2 border-pb-gold"
                : "text-pb-white/70 hover:text-pb-white hover:bg-pb-gray-800/50"
            }`}
          >
            {tab.label}
            {tab.count > 0 && (
              <span className={`ml-2 px-2 py-1 text-xs rounded-full ${
                activeTab === tab.id
                  ? "bg-pb-black/20 text-pb-black"
                  : "bg-pb-gray-700 text-pb-white/60"
              }`}>
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Trending Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Featured - First Item */}
        {filteredItems[0] && (
          <div className="lg:row-span-2">
            <div className="relative group cursor-pointer">
              <div className="aspect-video bg-pb-gray-800 rounded-xl overflow-hidden">
                <img 
                  src={`https://i.ytimg.com/vi/${filteredItems[0].youTubeId}/maxresdefault.jpg`}
                  alt={filteredItems[0].title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-pb-black via-transparent to-transparent" />
                
                {/* Trending Badge */}
                <div className="absolute top-4 left-4">
                  <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-pb-accent text-pb-black text-xs font-bold">
                    <div className="w-2 h-2 bg-pb-black rounded-full animate-pulse"></div>
                    #1 TRENDING
                  </div>
                </div>

                {/* Play Button */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-20 h-20 rounded-full bg-pb-gold/90 backdrop-blur-sm flex items-center justify-center shadow-glow">
                    <svg className="w-8 h-8 text-pb-black ml-1" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                    </svg>
                  </div>
                </div>
              </div>
              
              <div className="mt-4">
                <h3 className="text-xl lg:text-2xl font-bold text-pb-white mb-2 group-hover:text-pb-gold transition-colors">
                  {filteredItems[0].title}
                </h3>
                <div className="flex items-center gap-4 text-sm text-pb-white/60">
                  <span className="px-2 py-1 bg-pb-purple/20 text-pb-purple-light rounded-full capitalize">
                    {filteredItems[0].category}
                  </span>
                  <span>{filteredItems[0].views} views</span>
                  <span>•</span>
                  <span>{filteredItems[0].timeAgo}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Trending List */}
        <div className="space-y-4">
          {filteredItems.slice(1, 6).map((item, index) => (
            <div key={item.id || item.youTubeId} className="flex gap-4 group cursor-pointer">
              {/* Rank Number */}
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-pb-gray-800 flex items-center justify-center text-sm font-bold text-pb-gold">
                #{index + 2}
              </div>
              
              {/* Thumbnail */}
              <div className="flex-shrink-0 w-24 h-16 rounded-lg overflow-hidden bg-pb-gray-800">
                <img 
                  src={`https://i.ytimg.com/vi/${item.youTubeId}/hqdefault.jpg`}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              
              {/* Content */}
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-semibold text-pb-white mb-1 line-clamp-2 group-hover:text-pb-gold transition-colors">
                  {item.title}
                </h4>
                <div className="flex items-center gap-3 text-xs text-pb-white/50">
                  <span className="capitalize">{item.category}</span>
                  <span>•</span>
                  <span>{item.views}</span>
                  <span>•</span>
                  <span>{item.timeAgo}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* View All Button */}
      <div className="mt-12 text-center">
        <button className="group px-8 py-3 rounded-lg bg-gradient-to-r from-pb-gold/20 via-pb-purple/20 to-pb-accent/20 border border-pb-gold/30 text-pb-gold font-semibold transition-all duration-300 hover:bg-gradient-to-r hover:from-pb-gold hover:via-pb-gold-light hover:to-pb-gold hover:text-pb-black hover:shadow-glow">
          <span className="flex items-center gap-2">
            View All Trending Content
            <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-200" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </span>
        </button>
      </div>
    </section>
  );
}