"use client";
import { useState, useEffect } from "react";

interface VideoPlayerProps {
  youTubeId: string;
  title: string;
}

export default function VideoPlayer({ youTubeId, title }: VideoPlayerProps) {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const src = `https://www.youtube-nocookie.com/embed/${youTubeId}?autoplay=0&mute=0&controls=1&playsinline=1&modestbranding=1&rel=0&enablejsapi=1&origin=${typeof window !== 'undefined' ? window.location.origin : ''}`;

  useEffect(() => {
    // Reduce timeout for faster error detection
    const timer = setTimeout(() => {
      if (isLoading) {
        setHasError(true);
        setIsLoading(false);
      }
    }, 5000); // 5 second timeout for faster loading

    return () => clearTimeout(timer);
  }, [isLoading]);

  const handleLoad = () => {
    setIsLoading(false);
    setHasError(false);
  };

  const handleError = () => {
    setHasError(true);
    setIsLoading(false);
  };

  if (hasError) {
    return (
      <div className="flex items-center justify-center h-full bg-pb-gray-100 dark:bg-pb-gray-800 text-pb-gray-600 dark:text-pb-gray-400">
        <div className="text-center">
          <svg className="w-16 h-16 mx-auto mb-4 text-pb-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
          <p className="text-lg font-medium mb-2">Video Temporarily Unavailable</p>
          <p className="text-sm mb-4">This video may be temporarily unavailable or restricted in your region.</p>
          <a 
            href={`https://www.youtube.com/watch?v=${youTubeId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-pb-gold text-pb-gray-900 rounded-lg hover:bg-pb-gold-light transition-colors duration-200"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
            Watch on YouTube
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-pb-gray-100 dark:bg-pb-gray-800">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pb-gold mx-auto mb-4"></div>
            <p className="text-pb-gray-600 dark:text-pb-gray-400">Loading video...</p>
          </div>
        </div>
      )}
      <iframe
        className={`w-full h-full ${isLoading ? 'hidden' : 'block'}`}
        src={src}
        title={title}
        allow="autoplay; fullscreen; picture-in-picture"
        referrerPolicy="strict-origin-when-cross-origin"
        onLoad={handleLoad}
        onError={handleError}
        loading="lazy"
        frameBorder="0"
        allowFullScreen
      />
    </div>
  );
}
