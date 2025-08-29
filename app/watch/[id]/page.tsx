import { getVideoById } from "@/lib/videos";
import { notFound } from "next/navigation";

export default function WatchPage({ params }: { params: { id: string } }) {
  const video = getVideoById(params.id);
  if (!video) return notFound();
  const src = `https://www.youtube-nocookie.com/embed/${video.youTubeId}?autoplay=0&mute=0&controls=1&playsinline=1&modestbranding=1&rel=0`;
  
  return (
    <div className="min-h-screen bg-pb-white dark:bg-pb-gray-900 pt-20 page-transition">
      <div className="mx-auto max-w-5xl px-4 lg:px-8 py-8">
        <div className="aspect-video w-full rounded-xl overflow-hidden border border-pb-gray-300 dark:border-pb-gray-700 shadow-xl mb-6">
          <iframe
            className="w-full h-full"
            src={src}
            title={video.title}
            allow="autoplay; fullscreen; picture-in-picture"
            referrerPolicy="strict-origin-when-cross-origin"
          />
        </div>
        
        <div className="space-y-4">
          <h1 className="text-2xl lg:text-3xl font-bold text-pb-gray-900 dark:text-pb-white">{video.title}</h1>
          
          <div className="flex items-center gap-4 text-sm text-pb-gray-600 dark:text-pb-gray-400">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
              </svg>
              <span>1.2M views</span>
            </div>
            <span>•</span>
            <span>2 days ago</span>
          </div>
          
          <div className="flex items-center justify-between pt-4 border-t border-pb-gray-300 dark:border-pb-gray-700">
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-pb-gray-100/50 dark:bg-pb-gray-800/50 text-pb-gray-700 dark:text-pb-gray-300 hover:text-pb-gold transition-colors duration-200">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              Like
            </button>
            
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-pb-gray-100/50 dark:bg-pb-gray-800/50 text-pb-gray-700 dark:text-pb-gray-300 hover:text-pb-gold transition-colors duration-200">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
              </svg>
              Share
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}