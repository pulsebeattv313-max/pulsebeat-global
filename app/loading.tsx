export default function Loading() {
  return (
    <div className="min-h-screen bg-pb-black flex items-center justify-center">
      <div className="text-center">
        {/* Animated logo */}
        <div className="w-16 h-16 mx-auto mb-6 relative">
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-pb-gold to-pb-gold-light animate-pulse"></div>
          <div className="absolute inset-2 rounded-full bg-pb-black flex items-center justify-center">
            <span className="text-pb-gold font-bold text-sm">PB</span>
          </div>
        </div>
        
        {/* Loading text */}
        <div className="space-y-2">
          <h2 className="text-xl font-semibold text-pb-white">Loading...</h2>
          <p className="text-pb-white/60">Getting your content ready</p>
        </div>
        
        {/* Loading dots */}
        <div className="flex justify-center space-x-1 mt-6">
          <div className="w-2 h-2 bg-pb-gold rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-pb-gold rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-2 h-2 bg-pb-gold rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>
      </div>
    </div>
  );
}