"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import DonateButton from "./DonateButton";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
    
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { href: "/celebrities", label: "Celebrities", badge: "🌟" },
    { href: "/original-programming", label: "Originals", badge: "🎬" },
    { href: "/news-culture", label: "Culture", badge: "🔥" },
    { href: "/about", label: "About" },
  ];

  const isActive = (href: string) => mounted && pathname === href;

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? "bg-pb-black/95 backdrop-blur-md shadow-xl-dark border-b border-pb-gray-800" 
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <nav className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-18">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative">
              <img src="/logo.svg" alt="Pulsebeat Global" className="h-8 lg:h-10 w-auto transition-transform duration-200 group-hover:scale-110" />
              <div className="absolute inset-0 bg-pb-gold/20 rounded-lg blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
            </div>
            <div className="hidden sm:block">
              <span className="font-bold text-lg lg:text-xl text-pb-white group-hover:text-pb-gold transition-colors duration-200">
                Pulsebeat
              </span>
              <span className="font-light text-pb-white/70 ml-1">Global</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive(item.href)
                    ? "text-pb-gold bg-pb-gold/10 shadow-glow"
                    : "text-pb-white/80 hover:text-pb-white hover:bg-pb-gray-800/50"
                }`}
              >
                <span className="flex items-center gap-2">
                  {item.badge && <span className="text-xs">{item.badge}</span>}
                  {item.label}
                </span>
                {isActive(item.href) && (
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-6 h-0.5 bg-pb-gold rounded-full"></div>
                )}
              </Link>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-4">
            {/* Search Button */}
            <button className="hidden sm:flex items-center justify-center w-10 h-10 rounded-full bg-pb-gray-800/50 text-pb-white/70 hover:text-pb-gold hover:bg-pb-gray-700/50 transition-all duration-200">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>

            {/* Desktop Donate Button */}
            <div className="hidden sm:block">
              <DonateButton size="sm" />
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden flex items-center justify-center w-10 h-10 rounded-full bg-pb-gray-800/50 text-pb-white hover:text-pb-gold transition-colors duration-200"
              aria-label="Toggle menu"
            >
              <svg 
                className={`w-6 h-6 transform transition-transform duration-300 ${isMobileMenuOpen ? 'rotate-90' : ''}`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`lg:hidden transition-all duration-300 ease-in-out ${
        isMobileMenuOpen 
          ? "max-h-screen opacity-100" 
          : "max-h-0 opacity-0 pointer-events-none"
      }`}>
        <div className="bg-pb-black/95 backdrop-blur-md border-t border-pb-gray-800">
          <div className="mx-auto max-w-7xl px-4 py-6 space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 ${
                  isActive(item.href)
                    ? "text-pb-gold bg-pb-gold/10 border border-pb-gold/20"
                    : "text-pb-white/80 hover:text-pb-white hover:bg-pb-gray-800/50"
                }`}
              >
                <span className="flex items-center gap-3">
                  {item.badge && <span className="text-lg">{item.badge}</span>}
                  {item.label}
                  {isActive(item.href) && (
                    <svg className="w-4 h-4 ml-auto text-pb-gold" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </span>
              </Link>
            ))}
            
            {/* Mobile Search */}
            <div className="pt-4 border-t border-pb-gray-800">
              <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-pb-gray-800/30 text-pb-white/60">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <span className="text-sm">Search content...</span>
              </div>
            </div>

            {/* Mobile Donate Button */}
            <div className="pt-4">
              <DonateButton size="md" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}