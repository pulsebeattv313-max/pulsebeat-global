import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

// YouTube PubSubHubbub webhook handler
export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const signature = request.headers.get('x-hub-signature-256');
    
    // Verify webhook signature if secret is configured
    const webhookSecret = process.env.YOUTUBE_WEBHOOK_SECRET;
    if (webhookSecret && signature) {
      const expectedSignature = 'sha256=' + crypto
        .createHmac('sha256', webhookSecret)
        .update(body)
        .digest('hex');
      
      if (signature !== expectedSignature) {
        return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
      }
    }

    // Parse the webhook payload
    const payload = JSON.parse(body);
    
    // Handle different types of notifications
    if (payload.type === 'video.uploaded' || payload.type === 'video.published') {
      const videoId = payload.videoId;
      const channelId = payload.channelId;
      
      // Trigger immediate sync for this specific video
      await syncSpecificVideo(videoId, channelId);
      
      return NextResponse.json({ 
        success: true, 
        message: `Video ${videoId} synced successfully` 
      });
    }

    // Handle subscription verification
    if (payload.type === 'subscription.verify') {
      const challenge = payload.challenge;
      return new NextResponse(challenge, { status: 200 });
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Webhook received but no action needed' 
    });

  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    );
  }
}

// GET endpoint for webhook verification
export async function GET(request: NextRequest) {
  const hubMode = request.nextUrl.searchParams.get('hub.mode');
  const hubChallenge = request.nextUrl.searchParams.get('hub.challenge');
  const hubTopic = request.nextUrl.searchParams.get('hub.topic');
  const hubVerifyToken = request.nextUrl.searchParams.get('hub.verify_token');

  // Verify the subscription
  if (hubMode === 'subscribe' && hubChallenge) {
    const expectedToken = process.env.YOUTUBE_VERIFY_TOKEN || 'pulsebeat-verify-token';
    
    if (hubVerifyToken === expectedToken) {
      console.log(`YouTube webhook verified for topic: ${hubTopic}`);
      return new NextResponse(hubChallenge, { status: 200 });
    }
  }

  return NextResponse.json({ error: 'Verification failed' }, { status: 403 });
}

// Helper function to sync a specific video
async function syncSpecificVideo(videoId: string, channelId: string) {
  try {
    const apiKey = process.env.YOUTUBE_API_KEY;
    if (!apiKey) {
      throw new Error('YouTube API key not configured');
    }

    // Fetch video details
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?key=${apiKey}&id=${videoId}&part=snippet,contentDetails,statistics`
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch video details: ${response.status}`);
    }

    const data = await response.json();
    if (!data.items || data.items.length === 0) {
      throw new Error('Video not found');
    }

    const video = data.items[0];
    
    // Import the sync logic from the sync route
    const { categorizeVideo, generateTags, generateVideoId, formatDuration } = await import('../sync/route');
    
    // Process the video (similar to sync route logic)
    const category = categorizeVideo(video);
    const tags = generateTags(video, category);
    const newVideoId = generateVideoId(category, []);
    const duration = formatDuration(video.contentDetails.duration);

    const newVideo = {
      id: newVideoId,
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

    // Add to videos.json
    const fs = await import('fs');
    const path = await import('path');
    const videosPath = path.join(process.cwd(), 'data', 'videos.json');
    const existingVideos = JSON.parse(fs.readFileSync(videosPath, 'utf8'));
    
    existingVideos[category].push(newVideo);
    fs.writeFileSync(videosPath, JSON.stringify(existingVideos, null, 2));

    console.log(`Successfully synced video: ${video.snippet.title}`);
    
  } catch (error) {
    console.error('Error syncing specific video:', error);
    throw error;
  }
}
