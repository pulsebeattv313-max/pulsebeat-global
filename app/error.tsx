'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen bg-pb-black flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-pb-gold to-pb-gold-light flex items-center justify-center">
          <svg className="w-10 h-10 text-pb-black" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        </div>
        
        <h1 className="text-2xl font-bold text-pb-white mb-4">
          Something went wrong!
        </h1>
        
        <p className="text-pb-white/70 mb-8">
          We encountered an unexpected error. Don&rsquo;t worry, it&rsquo;s not you - it&rsquo;s us.
        </p>
        
        <div className="space-y-4">
          <button
            onClick={reset}
            className="w-full px-6 py-3 rounded-lg bg-gradient-to-r from-pb-gold to-pb-gold-light text-pb-black font-semibold hover:shadow-glow transition-all duration-300"
          >
            Try Again
          </button>
          
          <button
            onClick={() => window.location.href = '/'}
            className="w-full px-6 py-3 rounded-lg border border-pb-gold/50 text-pb-gold hover:bg-pb-gold hover:text-pb-black transition-all duration-300"
          >
            Go Home
          </button>
        </div>
        
        <p className="text-xs text-pb-white/40 mt-8">
          Error ID: {error.digest}
        </p>
      </div>
    </div>
  );
}