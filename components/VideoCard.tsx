"use client";
import Link from "next/link";
import { useState, useEffect } from "react";

type Props = { 
  id?: string; 
  youTubeId: string; 
  title: string;
  size?: "sm" | "md" | "lg" | "featured";
  showDuration?: boolean;
  category?: string;
  isNew?: boolean;
  isTrending?: boolean;
  views?: string;
  timeAgo?: string;
};

export default function VideoCard({ 
  id, 
  youTubeId, 
  title, 
  size = "md",
  showDuration = true,
  category,
  isNew = false,
  isTrending = false,
  views,
  timeAgo
}: Props) {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  const thumb = `https://i.ytimg.com/vi/${youTubeId}/hqdefault.jpg`;
  const link = `/watch/${id || youTubeId}`;
  
  const sizeClasses = {
    sm: "w-48",
    md: "w-64", 
    lg: "w-80",
    featured: "w-full max-w-md"
  };

  const aspectClasses = {
    sm: "h-32",
    md: "h-36",
    lg: "h-44",
    featured: "h-56"
  };

  // Generate varied duration based on video ID for consistency
  const generateDuration = (videoId: string) => {
    const hash = videoId.split('').reduce((a, b) => {
      a = ((a << 5) - a) + b.charCodeAt(0);
      return a & a;
    }, 0);
    const minutes = Math.abs(hash % 15) + 3; // 3-17 minutes
    const seconds = Math.abs(hash % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const duration = generateDuration(youTubeId);

  return (
    <Link 
      href={link} 
      className={`snap-center shrink-0 ${sizeClasses[size]} group block`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <article className="rounded-xl overflow-hidden bg-pb-gray-50/50 border border-pb-gray-200 backdrop-blur-sm transition-all duration-300 hover:border-pb-gold/60 hover:shadow-xl-light hover:scale-[1.02] hover:bg-pb-gray-100/70">
        {/* Thumbnail Container */}
        <div className="relative overflow-hidden">
          {/* Thumbnail Image */}
          <div className={`relative ${aspectClasses[size]} bg-pb-gray-200 overflow-hidden`}>
            <img 
              src={thumb} 
              alt={title} 
              className={`w-full h-full object-cover transition-all duration-500 ${
                isHovered ? 'scale-110' : 'scale-100'
              } ${isImageLoaded ? 'opacity-100' : 'opacity-0'}`}
              onLoad={() => setIsImageLoaded(true)}
            />
            
            {/* Loading Skeleton */}
            {!isImageLoaded && (
              <div className="absolute inset-0 bg-pb-gray-200 animate-pulse" />
            )}
            
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-pb-gray-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            {/* Play Button Overlay */}
            <div className={`absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 ${mounted && isHovered ? 'scale-100' : 'scale-75'}`}>
              <div className="w-16 h-16 rounded-full bg-pb-gold/90 backdrop-blur-sm flex items-center justify-center shadow-glow">
                <svg className="w-6 h-6 text-pb-gray-900 ml-1" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                </svg>
              </div>
            </div>
          </div>
          
          {/* Badges and Duration */}
          <div className="absolute top-3 left-3 right-3 flex justify-between items-start">
            <div className="flex gap-2">
              {isTrending && (
                <span className="px-2 py-1 text-xs font-bold bg-pb-accent text-pb-white rounded-full">
                  TRENDING
                </span>
              )}
              {isNew && (
                <span className="px-2 py-1 text-xs font-bold bg-pb-purple-light text-pb-white rounded-full">
                  NEW
                </span>
              )}
              {category && (
                <span className="px-2 py-1 text-xs font-medium bg-pb-white/90 text-pb-gold rounded-full backdrop-blur-sm border border-pb-gray-200">
                  {category.toUpperCase()}
                </span>
              )}
            </div>
            
            {showDuration && (
              <span className="px-2 py-1 text-xs font-medium bg-pb-gray-900/80 text-pb-white rounded backdrop-blur-sm">
                {duration}
              </span>
            )}
          </div>
        </div>
        
        {/* Content */}
        <div className="p-4">
          <h3 className="text-sm lg:text-base font-semibold text-pb-gray-900 line-clamp-2 leading-tight group-hover:text-pb-gold transition-colors duration-200">
            {title}
          </h3>
          
          {size === "featured" && (
            <div className="mt-3 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs text-pb-gray-500">
                <div className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                    <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                  </svg>
                  {views || "1.2M views"}
                </div>
                <span>•</span>
                <span>{timeAgo || "2 days ago"}</span>
              </div>
            </div>
          )}
        </div>
      </article>
    </Link>
  );
}