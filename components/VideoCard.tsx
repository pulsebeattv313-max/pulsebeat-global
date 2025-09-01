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
  const [imageError, setImageError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  // Generate multiple thumbnail qualities for better loading
  const thumbnails = {
    hq: `https://i.ytimg.com/vi/${youTubeId}/hqdefault.jpg`,
    mq: `https://i.ytimg.com/vi/${youTubeId}/mqdefault.jpg`,
    sd: `https://i.ytimg.com/vi/${youTubeId}/sddefault.jpg`,
    maxres: `https://i.ytimg.com/vi/${youTubeId}/maxresdefault.jpg`
  };
  
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

  const handleImageLoad = () => {
    setIsImageLoaded(true);
    setImageError(false);
  };

  const handleImageError = () => {
    setImageError(true);
    setIsImageLoaded(true);
  };

  return (
    <Link 
      href={link} 
      className={`snap-center shrink-0 ${sizeClasses[size]} group block`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <article className="rounded-xl overflow-hidden bg-pb-gray-50/50 dark:bg-gray-900/50 border border-pb-gray-200 dark:border-pb-gray-700 backdrop-blur-sm transition-all duration-300 hover:border-pb-gold/60 hover:shadow-xl-light hover:scale-[1.02] hover:bg-pb-gray-100/70 dark:hover:bg-gray-800/70">
        {/* Thumbnail Container */}
        <div className="relative overflow-hidden">
          {/* Thumbnail Image */}
          <div className={`relative ${aspectClasses[size]} bg-pb-gray-200 overflow-hidden`}>
            {/* Loading Skeleton */}
            {!isImageLoaded && !imageError && (
              <div className="absolute inset-0 bg-gradient-to-br from-pb-gray-200 dark:from-gray-800 to-pb-gray-300 dark:to-gray-700 animate-pulse">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-pb-white/20 dark:via-gray-600/20 to-transparent animate-shimmer"></div>
              </div>
            )}
            
            {/* Error Fallback */}
            {imageError && (
              <div className="absolute inset-0 bg-gradient-to-br from-pb-gold/20 to-pb-purple/20 flex items-center justify-center">
                <div className="text-center">
                  <svg className="w-12 h-12 text-pb-gray-500 dark:text-pb-gray-300 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  <p className="text-xs text-pb-gray-600 dark:text-pb-gray-300">Video Preview</p>
                </div>
              </div>
            )}
            
            {/* Progressive Image Loading */}
            {!imageError && (
              <>
                {/* Low quality placeholder */}
                <img 
                  src={thumbnails.mq}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover blur-sm scale-110 opacity-50"
                  onLoad={() => {
                    if (!isImageLoaded) {
                      // Load high quality image
                      const img = new Image();
                      img.onload = handleImageLoad;
                      img.onerror = handleImageError;
                      img.src = thumbnails.hq;
                    }
                  }}
                  onError={handleImageError}
                />
                
                {/* High quality image */}
                <img 
                  src={thumbnails.hq}
                  alt={title} 
                  className={`w-full h-full object-cover transition-all duration-500 ${
                    isHovered ? 'scale-110' : 'scale-100'
                  } ${isImageLoaded ? 'opacity-100' : 'opacity-0'}`}
                  onLoad={handleImageLoad}
                  onError={handleImageError}
                  loading="lazy"
                />
              </>
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
                <span className="px-2 py-1 text-xs font-medium bg-pb-white/95 dark:bg-pb-gray-800/95 text-pb-gold dark:text-pb-gold-light rounded-full backdrop-blur-sm border border-pb-gray-200 dark:border-pb-gray-600 font-semibold">
                  {category.toUpperCase()}
                </span>
              )}
            </div>
            
            {showDuration && (
              <span className="px-2 py-1 text-xs font-medium bg-pb-gray-900/90 text-pb-white rounded backdrop-blur-sm font-semibold">
                {duration}
              </span>
            )}
          </div>
        </div>
        
        {/* Content */}
        <div className="p-4">
          <h3 className="text-sm lg:text-base font-semibold text-pb-gray-900 dark:text-pb-white line-clamp-2 leading-tight group-hover:text-pb-gold transition-colors duration-200">
            {title}
          </h3>
          
          {size === "featured" && (
            <div className="mt-3 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs text-pb-gray-600 dark:text-pb-gray-300">
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