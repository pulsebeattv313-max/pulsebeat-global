"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import Image from "next/image";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/celebrities", label: "Celebrities" },
    { href: "/original-programming", label: "Original Programming" },
    { href: "/news-culture", label: "News & Culture" },
    { href: "/about", label: "About" },
    { href: "/team", label: "Team" },
    { href: "/partners", label: "Partners" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? "bg-pb-white/95 dark:bg-pb-gray-900/95 backdrop-blur-md border-b border-pb-gray-200 dark:border-pb-gray-700 shadow-lg" 
        : "bg-transparent"
    }`}>
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-18">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="relative w-8 h-8 lg:w-10 lg:h-10">
              <Image
                src="/logo.svg"
                alt="Pulsebeat Global"
                fill
                className="object-contain transition-transform duration-300 group-hover:scale-110"
              />
            </div>
            <span className={`font-bold text-lg lg:text-xl transition-colors duration-300 ${
              isScrolled ? "text-pb-gray-900 dark:text-pb-white" : "text-pb-white"
            }`}>
              Pulsebeat Global
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`font-medium transition-colors duration-200 hover:text-pb-gold ${
                  isScrolled ? "text-pb-gray-700 dark:text-pb-gray-300 hover:text-pb-gold" : "text-pb-white/90 hover:text-pb-white"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* CTA Button and Theme Toggle */}
          <div className="hidden lg:flex items-center space-x-4">
            <ThemeToggle />
            <Link
              href="/donate"
              className="px-6 py-2 rounded-lg bg-gradient-to-r from-pb-gold to-pb-gold-light text-pb-gray-900 font-semibold hover:shadow-glow transition-all duration-300 hover:scale-105"
            >
              Donate
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`lg:hidden p-2 rounded-lg transition-colors duration-200 ${
              isScrolled 
                ? "text-pb-gray-700 dark:text-pb-gray-300 hover:bg-pb-gray-100 dark:hover:bg-pb-gray-800" 
                : "text-pb-white hover:bg-pb-white/10"
            }`}
            aria-label="Toggle mobile menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {mounted && isMobileMenuOpen && (
          <div className="lg:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-pb-white/95 dark:bg-pb-gray-900/95 backdrop-blur-md rounded-lg mt-2 border border-pb-gray-200 dark:border-pb-gray-700 shadow-lg">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block px-3 py-2 rounded-md text-pb-gray-700 dark:text-pb-gray-300 font-medium hover:text-pb-gold hover:bg-pb-gray-50 dark:hover:bg-pb-gray-800 transition-colors duration-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <div className="pt-2 border-t border-pb-gray-200 dark:border-pb-gray-700">
                <div className="px-3 py-2">
                  <ThemeToggle />
                </div>
                <Link
                  href="/donate"
                  className="block px-3 py-2 rounded-md bg-gradient-to-r from-pb-gold to-pb-gold-light text-pb-gray-900 font-semibold hover:shadow-glow transition-all duration-300"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Donate
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}