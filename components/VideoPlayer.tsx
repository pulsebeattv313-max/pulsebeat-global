"use client";
import { useState, useEffect, useRef } from "react";

interface VideoPlayerProps {
  youTubeId: string;
  title: string;
}

export default function VideoPlayer({ youTubeId, title }: VideoPlayerProps) {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const src = `https://www.youtube-nocookie.com/embed/${youTubeId}?autoplay=0&mute=0&controls=1&playsinline=1&modestbranding=1&rel=0&enablejsapi=1&origin=${typeof window !== 'undefined' ? window.location.origin : 'https://www.pulsebeatglobal.com'}`;

  useEffect(() => {
    // More generous timeout for YouTube embeds
    const timer = setTimeout(() => {
      if (isLoading) {
        setHasError(true);
        setIsLoading(false);
      }
    }, 20000); // 20 second timeout

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

  // Add a fallback mechanism - if the iframe doesn't load after a reasonable time,
  // we'll assume it's loaded to avoid false error states
  useEffect(() => {
    const fallbackTimer = setTimeout(() => {
      if (isLoading && !hasError) {
        setIsLoading(false);
      }
    }, 5000); // 5 second fallback - assume loaded if no error

    return () => clearTimeout(fallbackTimer);
  }, [isLoading, hasError]);

  const handleRetry = () => {
    setHasError(false);
    setIsLoading(true);
    // Force iframe reload by updating the key
    if (iframeRef.current) {
      iframeRef.current.src = iframeRef.current.src;
    }
  };

  if (hasError) {
    return (
      <div className="flex items-center justify-center h-full bg-pb-gray-100 dark:bg-pb-gray-800 text-pb-gray-600 dark:text-pb-gray-400">
        <div className="text-center">
          <svg className="w-16 h-16 mx-auto mb-4 text-pb-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
          <p className="text-lg font-medium mb-2">Video Loading Issue</p>
          <p className="text-sm mb-4">There was a problem loading this video. Please try again or watch directly on YouTube.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={handleRetry}
              className="inline-flex items-center gap-2 px-4 py-2 bg-pb-gold text-pb-gray-900 rounded-lg hover:bg-pb-gold-light transition-colors duration-200"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
              </svg>
              Try Again
            </button>
            <a 
              href={`https://www.youtube.com/watch?v=${youTubeId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 border border-pb-gold text-pb-gold rounded-lg hover:bg-pb-gold hover:text-pb-gray-900 transition-colors duration-200"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
              Watch on YouTube
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full min-h-[400px]">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-pb-gray-100 dark:bg-pb-gray-800">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pb-gold mx-auto mb-4"></div>
            <p className="text-pb-gray-600 dark:text-pb-gray-400">Loading video...</p>
          </div>
        </div>
      )}
      <iframe
        ref={iframeRef}
        className={`w-full h-full min-h-[400px] ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
        src={src}
        title={title}
        allow="autoplay; fullscreen; picture-in-picture"
        referrerPolicy="strict-origin-when-cross-origin"
        onLoad={handleLoad}
        onError={handleError}
        loading="eager"
        frameBorder="0"
        allowFullScreen
      />
    </div>
  );
}
