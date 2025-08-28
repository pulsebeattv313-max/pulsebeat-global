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
  const mobileParams = "autoplay=1&mute=1&controls=0&playsinline=1&loop=1&playlist=" + youTubeId + "&modestbranding=1&rel=0&start=11&enablejsapi=1&origin=" + (typeof window !== 'undefined' ? window.location.origin : 'https://pulsebeat-global.com');
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
          <div className="absolute inset-0 bg-gradient-to-br from-pb-gold/30 via-pb-purple/20 to-pb-accent/30">
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden">
              {/* Floating circles */}
              <div className="absolute top-20 left-10 w-32 h-32 bg-pb-gold/20 rounded-full blur-xl animate-pulse"></div>
              <div className="absolute top-40 right-20 w-24 h-24 bg-pb-purple/20 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }}></div>
              <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-pb-accent/20 rounded-full blur-xl animate-pulse" style={{ animationDelay: '2s' }}></div>
              <div className="absolute bottom-20 right-1/3 w-28 h-28 bg-pb-gold/15 rounded-full blur-xl animate-pulse" style={{ animationDelay: '0.5s' }}></div>
              
              {/* Geometric shapes */}
              <div className="absolute top-1/4 left-1/2 w-16 h-16 bg-pb-purple/10 rotate-45 transform -translate-x-8 -translate-y-8"></div>
              <div className="absolute bottom-1/3 right-1/4 w-12 h-12 bg-pb-accent/15 rotate-12 transform"></div>
              
              {/* Subtle grid pattern */}
              <div className="absolute inset-0 opacity-5">
                <div className="w-full h-full" style={{
                  backgroundImage: `radial-gradient(circle at 1px 1px, rgba(212, 175, 55, 0.3) 1px, transparent 0)`,
                  backgroundSize: '40px 40px'
                }}></div>
              </div>
            </div>
          </div>
        )}
        
        {/* Fallback background for all devices */}
        <div className="absolute inset-0 bg-gradient-to-br from-pb-gold/10 via-pb-purple/5 to-pb-accent/10"></div>
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-pb-black/60 via-pb-black/30 to-pb-black/60"></div>

      {/* Content */}
      <div className={`relative z-10 h-full w-full max-w-7xl mx-auto px-4 lg:px-8 flex flex-col justify-center ${mounted && isLoaded ? 'animate-fade-in' : 'opacity-0'}`}>
        <div className="text-center">
          <h1 className="text-4xl lg:text-6xl xl:text-7xl font-bold font-heading text-pb-white mb-6 leading-tight">
            Welcome to{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pb-gold via-pb-gold-light to-pb-accent">
              Pulsebeat Global
            </span>
          </h1>
          <p className="text-xl lg:text-2xl text-pb-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
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