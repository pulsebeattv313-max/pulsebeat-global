import Hero from "@/components/Hero";
import VideoRail from "@/components/VideoRail";
import TrendingSection from "@/components/TrendingSection";
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
      <section className="mx-auto max-w-7xl px-4 lg:px-8 mt-24 mb-16">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-pb-purple/10 via-pb-gold/5 to-pb-accent/10 border border-pb-gold/20 backdrop-blur-sm">
          <div className="absolute inset-0 bg-gradient-to-br from-pb-white/80 via-pb-white/60 to-pb-white/80 dark:from-black/80 dark:via-black/60 dark:to-black/80"></div>
          <div className="relative z-10 px-8 py-16 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold font-heading text-pb-gray-900 dark:text-pb-white mb-4">
              Never Miss a <span className="text-transparent bg-clip-text bg-gradient-to-r from-pb-gold to-pb-accent">Pulsebeat</span>
            </h2>
            <p className="text-lg text-pb-gray-700 dark:text-pb-gray-300 mb-8 max-w-2xl mx-auto">
              Get exclusive content, early access to new shows, and behind-the-scenes moments 
              delivered directly to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-6 py-4 rounded-lg bg-pb-gray-100/50 dark:bg-pb-gray-700/50 border border-pb-gray-300 dark:border-pb-gray-600 text-pb-gray-900 dark:text-pb-white placeholder-pb-gray-600 dark:placeholder-pb-gray-300 focus:border-pb-gold focus:ring-2 focus:ring-pb-gold/20 focus:outline-none transition-all duration-200"
              />
              <button className="w-full sm:w-auto px-8 py-4 rounded-lg bg-gradient-to-r from-pb-gold to-pb-gold-light text-pb-gray-900 font-bold hover:shadow-glow transition-all duration-300 hover:scale-105">
                Subscribe
              </button>
            </div>
            <p className="text-xs text-pb-gray-600 dark:text-pb-gray-300 mt-4">
              No spam. Unsubscribe anytime. Your privacy is protected.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}