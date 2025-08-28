"use client";
import { useRef } from "react";
import VideoCard from "./VideoCard";

type TrendingItem = {
  id: string;
  youTubeId: string;
  title: string;
  category: string;
  views: string;
  timeAgo: string;
};

type Props = {
  items: TrendingItem[];
};

export default function TrendingSection({ items }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 320;
      const newScrollLeft = scrollRef.current.scrollLeft + (direction === "right" ? scrollAmount : -scrollAmount);
      scrollRef.current.scrollTo({ left: newScrollLeft, behavior: "smooth" });
    }
  };

  return (
    <section className="mx-auto max-w-7xl px-4 lg:px-8 mt-16">
      {/* Section Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h2 className="text-2xl lg:text-3xl font-bold font-heading text-pb-gray-900 mb-1">
            Detroit Trending
          </h2>
          <p className="text-pb-gray-500 text-sm">Latest and greatest from the Motor City</p>
        </div>
        
        <div className="flex items-center gap-4">
          <a 
            href="/news-culture" 
            className="group hidden sm:flex items-center gap-2 text-sm text-pb-gold hover:text-pb-gold-light transition-colors duration-200 font-medium"
          >
            View all trending
            <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-200" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </a>
          
          {/* Navigation Controls */}
          <div className="hidden lg:flex items-center gap-2">
            <button
              onClick={() => scroll("left")}
              className="p-2 rounded-full bg-pb-gray-100/50 border border-pb-gray-300 text-pb-gray-600 hover:text-pb-gold hover:border-pb-gold/50 transition-all duration-200 backdrop-blur-sm"
              aria-label="Scroll left"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </button>
            <button
              onClick={() => scroll("right")}
              className="p-2 rounded-full bg-pb-gray-100/50 border border-pb-gray-300 text-pb-gray-600 hover:text-pb-gold hover:border-pb-gold/50 transition-all duration-200 backdrop-blur-sm"
              aria-label="Scroll right"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Trending Videos Rail */}
      <div className="relative">
        <div 
          ref={scrollRef}
          className="flex gap-4 lg:gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {items.map((item, index) => (
            <VideoCard 
              key={item.id} 
              id={item.id} 
              youTubeId={item.youTubeId} 
              title={item.title}
              size="md"
              category={item.category}
              isTrending={index === 0}
              isNew={index <= 1}
              views={item.views}
              timeAgo={item.timeAgo}
            />
          ))}
        </div>
        
        {/* Fade edges for rail */}
        <div className="absolute top-0 left-0 bottom-4 w-8 bg-gradient-to-r from-pb-white to-transparent pointer-events-none" />
        <div className="absolute top-0 right-0 bottom-4 w-8 bg-gradient-to-l from-pb-white to-transparent pointer-events-none" />
      </div>
      
      {/* Mobile CTA */}
      <div className="mt-6 sm:hidden">
        <a 
          href="/news-culture"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-pb-gray-100/50 border border-pb-gray-300 text-pb-gold font-semibold hover:bg-pb-gold hover:text-pb-gray-900 transition-all duration-300 backdrop-blur-sm"
        >
          View all trending
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
          </svg>
        </a>
      </div>
    </section>
  );
}