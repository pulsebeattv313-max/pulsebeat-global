import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// YouTube API types
interface YouTubeVideo {
  id: string;
  snippet: {
    title: string;
    description: string;
    publishedAt: string;
    thumbnails: {
      default: { url: string };
      medium: { url: string };
      high: { url: string };
      standard: { url: string };
      maxres: { url: string };
    };
    channelTitle: string;
    tags?: string[];
  };
  contentDetails: {
    duration: string;
  };
  statistics: {
    viewCount: string;
    likeCount: string;
    commentCount: string;
  };
}

interface YouTubeResponse {
  items: YouTubeVideo[];
  nextPageToken?: string;
}

// Video categorization logic
function categorizeVideo(video: YouTubeVideo): string {
  const title = video.snippet.title.toLowerCase();
  const description = video.snippet.description.toLowerCase();
  const tags = video.snippet.tags?.join(' ').toLowerCase() || '';
  const content = `${title} ${description} ${tags}`;

  // PULSEBEAT WITH GREG DUNMORE episodes
  if (content.includes('pulsebeat with greg dunmore') || 
      content.includes('greg dunmore') ||
      content.includes('original programming')) {
    return 'originals';
  }

  // Celebrity interviews and features
  if (content.includes('celebrity') || 
      content.includes('interview') ||
      content.includes('exclusive') ||
      content.includes('montell') ||
      content.includes('mavis') ||
      content.includes('george benson') ||
      content.includes('mike epps') ||
      content.includes('sly stone') ||
      content.includes('roberta flack') ||
      content.includes('jayne kennedy') ||
      content.includes('aretha') ||
      content.includes('al green') ||
      content.includes('kendrick') ||
      content.includes('drake')) {
    return 'celebrities';
  }

  // Culture and news content
  if (content.includes('culture') || 
      content.includes('news') ||
      content.includes('detroit') ||
      content.includes('music') ||
      content.includes('jazz') ||
      content.includes('naacp') ||
      content.includes('civil rights') ||
      content.includes('history') ||
      content.includes('community') ||
      content.includes('lifestyle')) {
    return 'culture';
  }

  // Default to originals for PULSEBEAT content
  return 'originals';
}

// Generate tags based on content
function generateTags(video: YouTubeVideo, category: string): string[] {
  const title = video.snippet.title.toLowerCase();
  const description = video.snippet.description.toLowerCase();
  const tags = video.snippet.tags || [];
  const content = `${title} ${description}`;

  const baseTags = ['pulsebeat-tv', 'exclusive', 'entertainment'];
  
  if (category === 'originals') {
    baseTags.push('original-programming', 'greg-dunmore', 'nabj', 'emmy-nominated', 'award-winning', 'abc', 'wmyd', 'tv33-whpr', 'television', 'broadcast', 'documentary');
  } else if (category === 'celebrities') {
    baseTags.push('celebrity', 'interview');
  } else if (category === 'culture') {
    baseTags.push('news-culture', 'culture');
  }

  // Add content-specific tags
  if (content.includes('detroit')) baseTags.push('detroit');
  if (content.includes('jazz')) baseTags.push('jazz', 'music');
  if (content.includes('civil rights')) baseTags.push('civil-rights', 'black-history');
  if (content.includes('electric') || content.includes('ev')) baseTags.push('electric-vehicle', 'ev', 'sustainable-transportation', 'green-technology', 'automotive');
  if (content.includes('road trip') || content.includes('travel')) baseTags.push('road-trip', 'travel');
  if (content.includes('cleveland')) baseTags.push('cleveland');

  // Add existing YouTube tags (filtered)
  const filteredYouTubeTags = tags
    .filter(tag => tag.length > 2 && tag.length < 50)
    .map(tag => tag.toLowerCase().replace(/\s+/g, '-'))
    .slice(0, 10); // Limit to 10 tags

  return [...baseTags, ...filteredYouTubeTags];
}

// Generate unique ID for new videos
function generateVideoId(category: string, existingVideos: any[]): string {
  const prefix = category === 'celebrities' ? 'c' : category === 'originals' ? 'o' : 'n';
  const existingIds = existingVideos.map(v => v.id);
  
  let counter = 1;
  let newId = `${prefix}${counter}`;
  
  while (existingIds.includes(newId)) {
    counter++;
    newId = `${prefix}${counter}`;
  }
  
  return newId;
}

// Format duration from ISO 8601 to readable format
function formatDuration(duration: string): string {
  const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return '0:00';
  
  const hours = parseInt(match[1] || '0');
  const minutes = parseInt(match[2] || '0');
  const seconds = parseInt(match[3] || '0');
  
  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  } else {
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }
}

export async function POST(request: NextRequest) {
  try {
    const { apiKey, channelId, maxResults = 10 } = await request.json();

    if (!apiKey || !channelId) {
      return NextResponse.json(
        { error: 'YouTube API key and channel ID are required' },
        { status: 400 }
      );
    }

    // Fetch latest videos from YouTube
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelId}&part=snippet,id&order=date&maxResults=${maxResults}&type=video`
    );

    if (!response.ok) {
      throw new Error(`YouTube API error: ${response.status}`);
    }

    const data: YouTubeResponse = await response.json();

    // Get detailed video information
    const videoIds = data.items.map(item => item.id.videoId).join(',');
    const detailsResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?key=${apiKey}&id=${videoIds}&part=snippet,contentDetails,statistics`
    );

    if (!detailsResponse.ok) {
      throw new Error(`YouTube API details error: ${detailsResponse.status}`);
    }

    const detailsData: YouTubeResponse = await detailsResponse.json();

    // Read existing videos
    const videosPath = path.join(process.cwd(), 'data', 'videos.json');
    const existingVideos = JSON.parse(fs.readFileSync(videosPath, 'utf8'));

    const newVideos: any[] = [];
    const allExistingIds = [
      ...existingVideos.celebrities.map((v: any) => v.youTubeId),
      ...existingVideos.originals.map((v: any) => v.youTubeId),
      ...existingVideos.culture.map((v: any) => v.youTubeId)
    ];

    // Process each video
    for (const video of detailsData.items) {
      // Skip if video already exists
      if (allExistingIds.includes(video.id)) {
        continue;
      }

      const category = categorizeVideo(video);
      const tags = generateTags(video, category);
      const videoId = generateVideoId(category, existingVideos[category]);
      const duration = formatDuration(video.contentDetails.duration);

      const newVideo = {
        id: videoId,
        title: video.snippet.title,
        youTubeId: video.id,
        tags,
        description: video.snippet.description.substring(0, 500) + (video.snippet.description.length > 500 ? '...' : ''),
        duration,
        publishedAt: video.snippet.publishedAt,
        viewCount: parseInt(video.statistics.viewCount),
        likeCount: parseInt(video.statistics.likeCount),
        thumbnail: video.snippet.thumbnails.maxres?.url || video.snippet.thumbnails.high?.url
      };

      newVideos.push(newVideo);
      existingVideos[category].push(newVideo);
    }

    // Write updated videos back to file
    fs.writeFileSync(videosPath, JSON.stringify(existingVideos, null, 2));

    return NextResponse.json({
      success: true,
      newVideosCount: newVideos.length,
      newVideos,
      message: `Successfully synced ${newVideos.length} new videos`
    });

  } catch (error) {
    console.error('YouTube sync error:', error);
    return NextResponse.json(
      { error: 'Failed to sync YouTube videos', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

// GET endpoint to manually trigger sync (for testing)
export async function GET(request: NextRequest) {
  const apiKey = process.env.YOUTUBE_API_KEY;
  const channelId = process.env.YOUTUBE_CHANNEL_ID;

  if (!apiKey || !channelId) {
    return NextResponse.json(
      { error: 'YouTube API credentials not configured' },
      { status: 400 }
    );
  }

  try {
    const response = await fetch(`${request.nextUrl.origin}/api/youtube/sync`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ apiKey, channelId, maxResults: 5 })
    });

    const result = await response.json();
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to trigger sync' },
      { status: 500 }
    );
  }
}
