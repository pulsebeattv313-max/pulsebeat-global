"use client";
import { useState, useEffect } from "react";
import { getHeroId } from "@/lib/videos";

export default function Hero({ youTubeId }: { youTubeId: string }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setMounted(true);
    const timer = setTimeout(() => setIsLoaded(true), 100);
    
    // Check if mobile device
    const checkMobile = () => {
      const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;
      const isMobileDevice = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent.toLowerCase());
      setIsMobile(isMobileDevice);
    };
    
    checkMobile();
    
    return () => clearTimeout(timer);
  }, []);

  // Mobile-optimized parameters for autoplay
  const mobileParams = "autoplay=1&mute=1&controls=0&playsinline=1&loop=1&playlist=" + youTubeId + "&modestbranding=1&rel=0&start=11&enablejsapi=1&origin=" + (typeof window !== 'undefined' ? window.location.origin : 'https://www.pulsebeatglobal.com');
  const desktopParams = "autoplay=1&mute=1&controls=0&playsinline=1&loop=1&playlist=" + youTubeId + "&modestbranding=1&rel=0&start=11";
  
  const src = `https://www.youtube-nocookie.com/embed/${youTubeId}?${isMobile ? mobileParams : desktopParams}`;

  return (
    <section className="relative w-full h-screen overflow-hidden bg-pb-white pt-16 lg:pt-18">
      {/* Background - Video for Desktop, Graphic for Mobile */}
      <div className="absolute inset-0 top-16 lg:top-18 w-full h-full overflow-hidden">
        {/* Desktop Video Background */}
        {!isMobile && (
          <iframe
            className="absolute -top-20 w-full h-[calc(100%+40px)] object-cover scale-125"
            src={src}
            title="Pulsebeat Hero"
            allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
            referrerPolicy="strict-origin-when-cross-origin"
            loading="eager"
          />
        )}
        
        {/* Mobile Graphic Background */}
        {isMobile && (
          <div className="absolute inset-0 bg-gradient-to-br from-pb-gold/40 via-pb-purple/30 to-pb-accent/35">
            {/* Enhanced layered gradients for depth */}
            <div className="absolute inset-0 bg-gradient-to-t from-pb-black/60 via-transparent to-pb-purple/20"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-pb-gold/10 to-pb-accent/25"></div>
            <div className="absolute inset-0 bg-gradient-radial from-pb-gold/20 via-transparent to-pb-purple/15"></div>
            
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden">
              {/* Enhanced floating circles with better colors */}
              <div className="absolute top-16 left-8 w-40 h-40 bg-gradient-to-br from-pb-gold/25 to-pb-gold-light/15 rounded-full blur-2xl animate-pulse"></div>
              <div className="absolute top-32 right-16 w-32 h-32 bg-gradient-to-br from-pb-purple/25 to-pb-purple-light/15 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }}></div>
              <div className="absolute bottom-40 left-1/5 w-48 h-48 bg-gradient-to-br from-pb-accent/20 to-pb-accent-light/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }}></div>
              <div className="absolute bottom-24 right-1/4 w-36 h-36 bg-gradient-to-br from-pb-gold/20 to-pb-gold-light/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '0.5s' }}></div>
              <div className="absolute top-1/2 left-1/2 w-28 h-28 bg-gradient-to-br from-pb-purple/15 to-pb-accent/10 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1.5s' }}></div>
              
              {/* Enhanced geometric shapes with gradients */}
              <div className="absolute top-1/4 left-1/2 w-20 h-20 bg-gradient-to-br from-pb-purple/15 to-pb-purple-light/10 rotate-45 transform -translate-x-10 -translate-y-10 blur-sm"></div>
              <div className="absolute bottom-1/3 right-1/4 w-16 h-16 bg-gradient-to-br from-pb-accent/20 to-pb-accent-light/10 rotate-12 transform blur-sm"></div>
              <div className="absolute top-2/3 left-1/4 w-12 h-12 bg-gradient-to-br from-pb-gold/20 to-pb-gold-light/10 rotate-45 transform blur-sm"></div>
              
              {/* Enhanced grid pattern with better opacity */}
              <div className="absolute inset-0 opacity-10">
                <div className="w-full h-full" style={{
                  backgroundImage: `radial-gradient(circle at 1px 1px, rgba(212, 175, 55, 0.4) 1px, transparent 0)`,
                  backgroundSize: '50px 50px'
                }}></div>
              </div>
              
              {/* Additional mesh gradient overlay */}
              <div className="absolute inset-0 opacity-20" style={{
                background: `
                  radial-gradient(circle at 20% 80%, rgba(212, 175, 55, 0.3) 0%, transparent 50%),
                  radial-gradient(circle at 80% 20%, rgba(139, 92, 246, 0.3) 0%, transparent 50%),
                  radial-gradient(circle at 40% 40%, rgba(6, 182, 212, 0.3) 0%, transparent 50%)
                `
              }}></div>
            </div>
          </div>
        )}
        
        {/* Fallback background for all devices */}
        <div className="absolute inset-0 bg-gradient-to-br from-pb-gold/10 via-pb-purple/5 to-pb-accent/10"></div>
      </div>

      {/* Enhanced Overlay with depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-pb-black/70 via-pb-black/40 to-pb-black/80"></div>
      {/* Additional mobile-specific overlay for better text contrast */}
      {isMobile && (
        <div className="absolute inset-0 bg-gradient-to-t from-pb-black/50 via-transparent to-pb-black/30"></div>
      )}

      {/* Content */}
      <div className={`relative z-10 h-full w-full max-w-7xl mx-auto px-4 lg:px-8 flex flex-col justify-center ${mounted && isLoaded ? 'animate-fade-in' : 'opacity-0'}`}>
        <div className="text-center">
          <h1 className={`text-4xl lg:text-6xl xl:text-7xl font-bold font-heading mb-6 leading-tight ${
            isMobile 
              ? 'text-pb-white drop-shadow-2xl' 
              : 'text-pb-white'
          }`} style={isMobile ? {
            textShadow: '0 8px 32px rgba(0, 0, 0, 0.8), 0 4px 16px rgba(0, 0, 0, 0.6), 0 2px 8px rgba(0, 0, 0, 0.4)'
          } : {}}>
            <span className={isMobile ? 'drop-shadow-lg' : ''}>Welcome to</span>{" "}
            <span className={`relative inline-block text-transparent ${
              isMobile 
                ? 'hero-logo-text-mobile' 
                : 'hero-logo-text hover:scale-105 transition-transform duration-300'
            }`}>
              Pulsebeat Global
            </span>
          </h1>
          <p className={`text-xl lg:text-2xl text-pb-white/90 mb-8 max-w-3xl mx-auto leading-relaxed ${
            isMobile ? 'drop-shadow-lg' : ''
          }`} style={isMobile ? {
            textShadow: '0 4px 16px rgba(0, 0, 0, 0.7), 0 2px 8px rgba(0, 0, 0, 0.5)'
          } : {}}>
            Your premier destination for exclusive celebrity interviews, award-winning original programming, 
            and cultural content that celebrates the arts, entertainment, and human spirit.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="#celebs"
              className="px-8 py-4 rounded-lg bg-gradient-to-r from-pb-gold to-pb-gold-light text-pb-gray-900 font-bold text-lg hover:shadow-glow transition-all duration-300 hover:scale-105"
            >
              Explore Content
            </a>
            <a
              href="/about"
              className="px-8 py-4 rounded-lg border-2 border-pb-white/30 text-pb-white font-semibold text-lg hover:bg-pb-white/10 hover:border-pb-white/50 transition-all duration-300"
            >
              Learn More
            </a>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-pb-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-pb-white/70 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
}