/// <reference types="react" />
import React from "react";

import Hero from "@/components/Hero";
import VideoRail from "@/components/VideoRail";
import TrendingSection from "@/components/TrendingSection";
import NewsletterSignup from "@/components/NewsletterSignup";
import { getAllForCategory, getHeroId } from "@/lib/videos";

export default function HomePage() {
  const celebs = getAllForCategory("celebrities");
  const originals = getAllForCategory("originals");
  const culture = getAllForCategory("culture");
  const heroId = getHeroId();

  // Detroit Trending data - featuring Detroit-related content from our collection with varied view counts
  const detroitTrendingData = [
    {
      id: "o6", // Using actual video ID from originals
      youTubeId: "_43zPH1YHeQ", 
      title: "PULSEBEAT WITH GREG DUNMORE: Jazz and the NAACP - Detroit's WJZZ and Freedom Fund Dinner",
      category: "originals",
      views: "4.1M",
      timeAgo: "30 minutes ago"
    },
    {
      id: "c6", // Using actual video ID from celebrities
      youTubeId: "qJi5txQb0_o", 
      title: "George Benson Talks with Pulsebeat Media's Greg Dunmore at Detroit Jazz Fest",
      category: "celebrities",
      views: "3.2M",
      timeAgo: "1 hour ago"
    },
    {
      id: "c4", // Using actual video ID from celebrities
      youTubeId: "5rTk7kh7JH8", 
      title: "Mike Epps Opens Up About Katt Williams at 'One Mike' Club Opening in Detroit",
      category: "celebrities",
      views: "2.4M",
      timeAgo: "2 hours ago"
    },
    {
      id: "o5", // Using actual video ID from originals
      youTubeId: "AWVCnsTa0-0",
      title: "PULSEBEAT WITH GREG DUNMORE: Investigating Elvis Presley - Award-Winning TV Show",
      category: "originals", 
      views: "1.8M",
      timeAgo: "5 hours ago"
    },
    {
      id: "c5", // Using actual video ID from celebrities
      youTubeId: "eo84meCumuE", 
      title: "Jo Thompson Proves The Best Is Yet To Come - Forever Fabulous at 82",
      category: "celebrities",
      views: "1.2M", 
      timeAgo: "1 day ago"
    }
  ];

  return (
    <div className="min-h-screen bg-pb-white dark:bg-black">
      {/* Hero Section */}
      <Hero youTubeId={heroId} />
      
      {/* Detroit Trending Section */}
      <TrendingSection items={detroitTrendingData} />
      
      {/* Original Programming Grid - Now Top Section */}
      <VideoRail 
        title="Original Programming" 
        subtitle="Award-winning shows and series you can't find anywhere else"
        anchor="originals"
        items={originals} 
        ctaHref="/original-programming" 
        ctaLabel="Browse all shows"
        layout="grid"
        size="featured"
      />
      
      {/* Featured Celebrity Content */}
      <VideoRail 
        title="Celebrity Spotlight" 
        subtitle="Exclusive interviews and behind-the-scenes moments"
        anchor="celebs" 
        items={celebs} 
        ctaHref="/celebrities" 
        ctaLabel="See all celebrities"
        size="lg"
      />
      
      {/* News & Culture Rail */}
      <VideoRail 
        title="Culture & News" 
        subtitle="Stay ahead of the curve with trending stories"
        items={culture} 
        ctaHref="/news-culture" 
        ctaLabel="View more stories"
        size="md"
      />
      
      {/* Newsletter Signup Section */}
      <NewsletterSignup />
    </div>
  );
}