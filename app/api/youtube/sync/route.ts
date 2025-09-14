import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { 
  categorizeVideo, 
  generateTags, 
  generateVideoId, 
  formatDuration,
  YouTubeSearchResponse,
  YouTubeVideoResponse
} from '@/lib/youtube-utils';

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

    const data: YouTubeSearchResponse = await response.json();

    // Get detailed video information
    const videoIds = data.items.map(item => item.id.videoId).join(',');
    const detailsResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?key=${apiKey}&id=${videoIds}&part=snippet,contentDetails,statistics`
    );

    if (!detailsResponse.ok) {
      throw new Error(`YouTube API details error: ${detailsResponse.status}`);
    }

    const detailsData: YouTubeVideoResponse = await detailsResponse.json();

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
