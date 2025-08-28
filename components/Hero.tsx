"use client";
import { useState, useEffect } from "react";

type Props = { youTubeId: string };

export default function Hero({ youTubeId }: Props) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [showPlayButton, setShowPlayButton] = useState(true);
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
    setIsLoaded(true);
  }, []);

  const src = `https://www.youtube-nocookie.com/embed/${youTubeId}?autoplay=1&mute=1&controls=0&playsinline=1&loop=1&playlist=${youTubeId}&modestbranding=1&rel=0&start=11`;
  
  return (
    <section className="relative w-full h-screen overflow-hidden bg-pb-black pt-16 lg:pt-18">
      {/* Background Video */}
      <div className="absolute inset-0 top-16 lg:top-18 w-full h-full overflow-hidden">
        <iframe
          className="absolute -top-20 w-full h-[calc(100%+40px)] object-cover scale-125"
          src={src}
          title="Pulsebeat Hero"
          allow="autoplay; fullscreen; picture-in-picture"
          referrerPolicy="strict-origin-when-cross-origin"
          onLoad={() => setShowPlayButton(false)}
        />
        {/* Gradient overlays for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-pb-black via-pb-black/60 to-pb-black/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-pb-black/80 via-transparent to-pb-black/40" />
      </div>

      {/* Hero Content */}
      <div className={`relative z-10 h-full w-full max-w-7xl mx-auto px-4 lg:px-8 flex flex-col justify-center ${mounted && isLoaded ? 'animate-fade-in' : 'opacity-0'}`}>
        <div className="max-w-4xl">
          {/* Trending Badge */}
          <div className="mb-4">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-pb-accent/20 text-pb-accent border border-pb-accent/30 backdrop-blur-sm">
              <div className="w-2 h-2 bg-pb-accent rounded-full mr-2 animate-pulse-gold"></div>
              TRENDING NOW
            </span>
          </div>
          
          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-7xl xl:text-8xl font-bold font-heading leading-[0.9] mb-6">
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-pb-white via-pb-gold to-pb-white">
              The Pulse of a
            </span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-pb-gold via-pb-accent to-pb-gold animate-pulse-gold">
              New Generation
            </span>
          </h1>
          
          {/* Subtitle */}
          <div className="max-w-2xl mb-8">
            <p className="text-lg lg:text-xl text-pb-white/90 leading-relaxed font-medium">
              Where celebrity culture meets original programming. Experience the fusion of 
              <span className="text-pb-gold font-semibold"> sensation</span>, 
              <span className="text-pb-accent font-semibold"> information</span>, and 
              <span className="text-pb-purple-light font-semibold"> entertainment</span>.
            </p>
          </div>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <a 
              href="#celebs" 
              className="group relative overflow-hidden px-8 py-4 rounded-lg bg-gradient-to-r from-pb-gold to-pb-gold-light text-pb-black font-bold text-lg transition-all duration-300 hover:shadow-glow hover:scale-105 focus:ring-4 focus:ring-pb-gold/30"
            >
              <span className="relative z-10 flex items-center justify-center">
                Watch Exclusive Content
                <svg className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-200" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-pb-gold-light to-pb-gold opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </a>
            
            <a 
              href="/donate" 
              className="group px-8 py-4 rounded-lg border-2 border-pb-gold/70 text-pb-gold font-bold text-lg backdrop-blur-sm bg-pb-black/30 transition-all duration-300 hover:bg-pb-gold hover:text-pb-black hover:border-pb-gold focus:ring-4 focus:ring-pb-gold/30"
            >
              Support Our Mission
            </a>
          </div>
          
          {/* Stats/Features */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center lg:text-left">
              <div className="text-2xl lg:text-3xl font-bold text-pb-gold">100+</div>
              <div className="text-sm text-pb-white/70 font-medium">Celebrity Features</div>
            </div>
            <div className="text-center lg:text-left">
              <div className="text-2xl lg:text-3xl font-bold text-pb-accent">50+</div>
              <div className="text-sm text-pb-white/70 font-medium">Original Shows</div>
            </div>
            <div className="text-center lg:text-left">
              <div className="text-2xl lg:text-3xl font-bold text-pb-purple-light">24/7</div>
              <div className="text-sm text-pb-white/70 font-medium">Fresh Content</div>
            </div>
            <div className="text-center lg:text-left">
              <div className="text-2xl lg:text-3xl font-bold text-pb-white">1M+</div>
              <div className="text-sm text-pb-white/70 font-medium">Global Viewers</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex flex-col items-center text-pb-white/60 hover:text-pb-gold transition-colors duration-300 cursor-pointer">
          <span className="text-xs font-medium mb-2 uppercase tracking-wider">Explore</span>
          <div className="w-6 h-10 border-2 border-current rounded-full flex justify-center">
            <div className="w-1 h-3 bg-current rounded-full mt-2 animate-bounce"></div>
          </div>
        </div>
      </div>
    </section>
  );
}