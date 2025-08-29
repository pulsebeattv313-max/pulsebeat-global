"use client";
import { useRef } from "react";
import VideoCard from "./VideoCard";

type Item = { 
  id?: string; 
  youTubeId: string; 
  title: string;
  category?: string;
  isNew?: boolean;
  isTrending?: boolean;
};

type Props = { 
  title: string; 
  anchor?: string; 
  items: Item[]; 
  ctaHref?: string; 
  ctaLabel?: string;
  layout?: "rail" | "grid";
  size?: "sm" | "md" | "lg" | "featured";
  subtitle?: string;
  showNavigation?: boolean;
};

export default function VideoRail({ 
  title, 
  anchor, 
  items, 
  ctaHref, 
  ctaLabel,
  layout = "rail",
  size = "md",
  subtitle,
  showNavigation = true
}: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 320; // Width of card + gap
      const newScrollLeft = scrollRef.current.scrollLeft + (direction === "right" ? scrollAmount : -scrollAmount);
      scrollRef.current.scrollTo({ left: newScrollLeft, behavior: "smooth" });
    }
  };

  // Generate varied view counts and time data for each video
  const generateVideoStats = (youTubeId: string, index: number) => {
    const hash = youTubeId.split('').reduce((a, b) => {
      a = ((a << 5) - a) + b.charCodeAt(0);
      return a & a;
    }, 0);
    
    // Generate view count based on hash and index
    const baseViews = Math.abs(hash % 5000) + 100; // 100-5100 base
    const multiplier = Math.abs(hash % 10) + 1; // 1-10 multiplier
    const totalViews = baseViews * multiplier;
    
    // Format view count
    let viewText = "";
    if (totalViews >= 1000000) {
      viewText = `${(totalViews / 1000000).toFixed(1)}M`;
    } else if (totalViews >= 1000) {
      viewText = `${(totalViews / 1000).toFixed(1)}K`;
    } else {
      viewText = totalViews.toString();
    }
    
    // Generate time ago based on hash
    const timeOptions = [
      "30 minutes ago", "1 hour ago", "2 hours ago", "5 hours ago", 
      "1 day ago", "2 days ago", "3 days ago", "1 week ago", "2 weeks ago"
    ];
    const timeIndex = Math.abs(hash % timeOptions.length);
    const timeAgo = timeOptions[timeIndex];
    
    return { views: viewText, timeAgo };
  };

  const enhancedItems = items.map((item, index) => {
    const stats = generateVideoStats(item.youTubeId, index);
    return {
      ...item,
      category: item.category || (index === 0 ? "Featured" : undefined),
      isTrending: item.isTrending || index === 0,
      isNew: item.isNew || index <= 1,
      views: stats.views,
      timeAgo: stats.timeAgo,
    };
  });

  if (layout === "grid") {
    return (
      <section id={anchor} className="mx-auto max-w-7xl px-4 lg:px-8 mt-16">
        {/* Section Header */}
        <div className="flex items-start justify-between mb-8">
          <div>
            <h2 className="text-3xl lg:text-4xl font-bold font-heading text-pb-gray-900 dark:text-pb-white mb-2">
              {title}
            </h2>
            {subtitle && (
              <p className="text-pb-gray-600 dark:text-pb-gray-400 text-lg max-w-2xl">{subtitle}</p>
            )}
          </div>
          {ctaHref && ctaLabel && (
            <a 
              href={ctaHref} 
              className="group flex items-center gap-2 px-6 py-3 rounded-lg bg-pb-gray-100/50 dark:bg-pb-gray-800/50 border border-pb-gray-300 dark:border-pb-gray-600 text-pb-gold font-semibold hover:bg-pb-gold hover:text-pb-gray-900 transition-all duration-300 backdrop-blur-sm"
            >
              {ctaLabel}
              <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-200" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </a>
          )}
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {enhancedItems.map((v, index) => (
            <VideoCard 
              key={v.id || v.youTubeId} 
              id={v.id} 
              youTubeId={v.youTubeId} 
              title={v.title}
              size={index === 0 ? "featured" : size}
              category={v.category}
              isNew={v.isNew}
              isTrending={v.isTrending}
              views={v.views}
              timeAgo={v.timeAgo}
            />
          ))}
        </div>
      </section>
    );
  }

  // Rail Layout
  return (
    <section id={anchor} className="mx-auto max-w-7xl px-4 lg:px-8 mt-16">
      {/* Section Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h2 className="text-2xl lg:text-3xl font-bold font-heading text-pb-gray-900 dark:text-pb-white mb-1">
            {title}
          </h2>
          {subtitle && (
            <p className="text-pb-gray-500 dark:text-pb-gray-400 text-sm">{subtitle}</p>
          )}
        </div>
        
        <div className="flex items-center gap-4">
          {ctaHref && ctaLabel && (
            <a 
              href={ctaHref} 
              className="group hidden sm:flex items-center gap-2 text-sm text-pb-gold hover:text-pb-gold-light transition-colors duration-200 font-medium"
            >
              {ctaLabel}
              <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-200" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </a>
          )}
          
          {/* Navigation Controls */}
          {showNavigation && (
            <div className="hidden lg:flex items-center gap-2">
              <button
                onClick={() => scroll("left")}
                className="p-2 rounded-full bg-pb-gray-100/50 dark:bg-pb-gray-800/50 border border-pb-gray-300 dark:border-pb-gray-600 text-pb-gray-600 dark:text-pb-gray-400 hover:text-pb-gold hover:border-pb-gold/50 transition-all duration-200 backdrop-blur-sm"
                aria-label="Scroll left"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </button>
              <button
                onClick={() => scroll("right")}
                className="p-2 rounded-full bg-pb-gray-100/50 dark:bg-pb-gray-800/50 border border-pb-gray-300 dark:border-pb-gray-600 text-pb-gray-600 dark:text-pb-gray-400 hover:text-pb-gold hover:border-pb-gold/50 transition-all duration-200 backdrop-blur-sm"
                aria-label="Scroll right"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Scrollable Rail */}
      <div className="relative">
        <div 
          ref={scrollRef}
          className="flex gap-4 lg:gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {enhancedItems.map((v, index) => (
            <VideoCard 
              key={v.id || v.youTubeId} 
              id={v.id} 
              youTubeId={v.youTubeId} 
              title={v.title}
              size={size}
              category={v.category}
              isNew={v.isNew}
              isTrending={v.isTrending}
              views={v.views}
              timeAgo={v.timeAgo}
            />
          ))}
        </div>
        
        {/* Fade edges for rail */}
        <div className="absolute top-0 left-0 bottom-4 w-8 bg-gradient-to-r from-pb-white dark:from-pb-gray-900 to-transparent pointer-events-none" />
        <div className="absolute top-0 right-0 bottom-4 w-8 bg-gradient-to-l from-pb-white dark:from-pb-gray-900 to-transparent pointer-events-none" />
      </div>
      
      {/* Mobile CTA */}
      {ctaHref && ctaLabel && (
        <div className="mt-6 sm:hidden">
          <a 
            href={ctaHref}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-pb-gray-100/50 border border-pb-gray-300 text-pb-gold font-semibold hover:bg-pb-gold hover:text-pb-gray-900 transition-all duration-300 backdrop-blur-sm"
          >
            {ctaLabel}
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </a>
        </div>
      )}
    </section>
  );
}