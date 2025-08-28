"use client";
import { useState, useEffect } from "react";
import { getHeroId } from "@/lib/videos";

export default function Hero({ youTubeId }: { youTubeId: string }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const src = `https://www.youtube-nocookie.com/embed/${youTubeId}?autoplay=1&mute=1&controls=0&playsinline=1&loop=1&playlist=${youTubeId}&modestbranding=1&rel=0&start=11`;

  return (
    <section className="relative w-full h-screen overflow-hidden bg-pb-white pt-16 lg:pt-18">
      {/* Background Video */}
      <div className="absolute inset-0 top-16 lg:top-18 w-full h-full overflow-hidden">
        <iframe
          className="absolute -top-20 w-full h-[calc(100%+40px)] object-cover scale-125"
          src={src}
          title="Pulsebeat Hero"
          allow="autoplay; fullscreen; picture-in-picture"
          referrerPolicy="strict-origin-when-cross-origin"
        />
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