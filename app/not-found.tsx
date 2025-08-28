import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-pb-black flex items-center justify-center px-4 pt-20">
      <div className="text-center max-w-lg">
        <div className="w-32 h-32 mx-auto mb-8 relative">
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-pb-gold to-pb-gold-light opacity-20"></div>
          <div className="absolute inset-4 rounded-full bg-pb-black flex items-center justify-center">
            <span className="text-4xl font-bold text-pb-gold">404</span>
          </div>
        </div>
        
        <h1 className="text-3xl font-bold text-pb-white mb-4">
          Content Not Found
        </h1>
        
        <p className="text-pb-white/70 mb-8 leading-relaxed">
          The content you&rsquo;re looking for doesn&rsquo;t exist or has been moved. 
          Let&rsquo;s get you back to discovering amazing content.
        </p>
        
        <div className="space-y-4">
          <Link
            href="/"
            className="inline-block px-8 py-3 rounded-lg bg-gradient-to-r from-pb-gold to-pb-gold-light text-pb-black font-semibold hover:shadow-glow transition-all duration-300"
          >
            Back to Home
          </Link>
          
          <div className="flex justify-center space-x-4 text-sm">
            <Link href="/celebrities" className="text-pb-gold hover:text-pb-gold-light transition-colors">
              Celebrities
            </Link>
            <Link href="/original-programming" className="text-pb-gold hover:text-pb-gold-light transition-colors">
              Originals
            </Link>
            <Link href="/news-culture" className="text-pb-gold hover:text-pb-gold-light transition-colors">
              Culture
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}