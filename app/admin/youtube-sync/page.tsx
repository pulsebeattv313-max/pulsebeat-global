"use client";

import { useState } from 'react';

interface SyncResult {
  success: boolean;
  newVideosCount: number;
  newVideos: any[];
  message: string;
  error?: string;
}

export default function YouTubeSyncAdmin() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<SyncResult | null>(null);
  const [apiKey, setApiKey] = useState('');
  const [channelId, setChannelId] = useState('');

  const handleSync = async () => {
    if (!apiKey || !channelId) {
      alert('Please enter both API Key and Channel ID');
      return;
    }

    setIsLoading(true);
    setResult(null);

    try {
      const response = await fetch('/api/youtube/sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          apiKey, 
          channelId, 
          maxResults: 10 
        })
      });

      const data = await response.json();
      setResult(data);
    } catch (error) {
      setResult({
        success: false,
        newVideosCount: 0,
        newVideos: [],
        message: 'Sync failed',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickSync = async () => {
    setIsLoading(true);
    setResult(null);

    try {
      const response = await fetch('/api/youtube/sync');
      const data = await response.json();
      setResult(data);
    } catch (error) {
      setResult({
        success: false,
        newVideosCount: 0,
        newVideos: [],
        message: 'Quick sync failed',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-pb-white dark:bg-black pt-20">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-pb-gray-50 dark:bg-pb-gray-900 rounded-xl p-8">
          <h1 className="text-3xl font-bold text-pb-gray-900 dark:text-pb-white mb-2">
            YouTube Sync Management
          </h1>
          <p className="text-pb-gray-600 dark:text-pb-gray-300 mb-8">
            Manually sync videos from your YouTube channel to the website.
          </p>

          {/* Quick Sync */}
          <div className="mb-8 p-6 bg-pb-gray-100 dark:bg-pb-gray-800 rounded-lg">
            <h2 className="text-xl font-semibold text-pb-gray-900 dark:text-pb-white mb-4">
              Quick Sync (Using Environment Variables)
            </h2>
            <p className="text-pb-gray-600 dark:text-pb-gray-300 mb-4">
              This will use the API key and channel ID configured in your environment variables.
            </p>
            <button
              onClick={handleQuickSync}
              disabled={isLoading}
              className="px-6 py-3 bg-pb-gold text-pb-black font-semibold rounded-lg hover:bg-pb-gold-light transition-colors disabled:opacity-50"
            >
              {isLoading ? 'Syncing...' : 'Quick Sync'}
            </button>
          </div>

          {/* Manual Sync */}
          <div className="mb-8 p-6 bg-pb-gray-100 dark:bg-pb-gray-800 rounded-lg">
            <h2 className="text-xl font-semibold text-pb-gray-900 dark:text-pb-white mb-4">
              Manual Sync (Custom Credentials)
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-pb-gray-700 dark:text-pb-gray-300 mb-2">
                  YouTube API Key
                </label>
                <input
                  type="password"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  className="w-full px-4 py-2 border border-pb-gray-300 dark:border-pb-gray-600 rounded-lg bg-pb-white dark:bg-pb-gray-700 text-pb-gray-900 dark:text-pb-white"
                  placeholder="Enter your YouTube API key"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-pb-gray-700 dark:text-pb-gray-300 mb-2">
                  YouTube Channel ID
                </label>
                <input
                  type="text"
                  value={channelId}
                  onChange={(e) => setChannelId(e.target.value)}
                  className="w-full px-4 py-2 border border-pb-gray-300 dark:border-pb-gray-600 rounded-lg bg-pb-white dark:bg-pb-gray-700 text-pb-gray-900 dark:text-pb-white"
                  placeholder="Enter your YouTube channel ID"
                />
              </div>
              
              <button
                onClick={handleSync}
                disabled={isLoading || !apiKey || !channelId}
                className="px-6 py-3 bg-pb-gold text-pb-black font-semibold rounded-lg hover:bg-pb-gold-light transition-colors disabled:opacity-50"
              >
                {isLoading ? 'Syncing...' : 'Sync Videos'}
              </button>
            </div>
          </div>

          {/* Results */}
          {result && (
            <div className={`p-6 rounded-lg ${
              result.success 
                ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800' 
                : 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800'
            }`}>
              <h3 className={`text-lg font-semibold mb-2 ${
                result.success 
                  ? 'text-green-800 dark:text-green-200' 
                  : 'text-red-800 dark:text-red-200'
              }`}>
                {result.success ? '✅ Sync Successful' : '❌ Sync Failed'}
              </h3>
              
              <p className={`mb-4 ${
                result.success 
                  ? 'text-green-700 dark:text-green-300' 
                  : 'text-red-700 dark:text-red-300'
              }`}>
                {result.message}
              </p>

              {result.success && result.newVideosCount > 0 && (
                <div>
                  <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">
                    New Videos Added ({result.newVideosCount}):
                  </h4>
                  <ul className="space-y-2">
                    {result.newVideos.map((video, index) => (
                      <li key={index} className="text-green-700 dark:text-green-300">
                        • {video.title} (ID: {video.id})
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {result.error && (
                <div className="mt-4 p-3 bg-red-100 dark:bg-red-900/30 rounded border border-red-200 dark:border-red-800">
                  <p className="text-red-800 dark:text-red-200 text-sm">
                    <strong>Error:</strong> {result.error}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Instructions */}
          <div className="mt-8 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
            <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-200 mb-4">
              📚 Setup Instructions
            </h3>
            <div className="text-blue-700 dark:text-blue-300 space-y-2 text-sm">
              <p>1. Get a YouTube Data API v3 key from Google Cloud Console</p>
              <p>2. Find your YouTube Channel ID using online tools</p>
              <p>3. Add credentials to your environment variables</p>
              <p>4. Deploy to Vercel for automatic hourly sync</p>
              <p>5. Videos will be automatically categorized based on content</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
