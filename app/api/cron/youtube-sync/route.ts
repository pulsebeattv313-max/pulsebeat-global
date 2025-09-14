import { NextRequest, NextResponse } from 'next/server';

// Vercel Cron Job for automatic YouTube sync
// This runs every hour to check for new videos
export async function GET(request: NextRequest) {
  // Verify this is a legitimate cron request
  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const apiKey = process.env.YOUTUBE_API_KEY;
    const channelId = process.env.YOUTUBE_CHANNEL_ID;

    if (!apiKey || !channelId) {
      return NextResponse.json(
        { error: 'YouTube API credentials not configured' },
        { status: 400 }
      );
    }

    // Call the sync endpoint
    const syncResponse = await fetch(`${request.nextUrl.origin}/api/youtube/sync`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        apiKey, 
        channelId, 
        maxResults: 5 // Check last 5 videos
      })
    });

    const result = await syncResponse.json();

    if (result.success) {
      console.log(`Cron sync completed: ${result.newVideosCount} new videos found`);
      return NextResponse.json({
        success: true,
        message: `Cron sync completed successfully`,
        newVideosCount: result.newVideosCount,
        timestamp: new Date().toISOString()
      });
    } else {
      throw new Error(result.error || 'Sync failed');
    }

  } catch (error) {
    console.error('Cron sync error:', error);
    return NextResponse.json(
      { 
        error: 'Cron sync failed', 
        details: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}
