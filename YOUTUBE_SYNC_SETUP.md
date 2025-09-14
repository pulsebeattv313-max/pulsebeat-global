# YouTube Automatic Video Sync Setup

This guide will help you set up automatic synchronization of YouTube videos to your Pulsebeat Global website.

## 🎯 Overview

The YouTube sync system automatically:
- Fetches new videos from your YouTube channel
- Categorizes them based on content (celebrities, originals, culture)
- Adds them to your website's video collection
- Runs every hour via Vercel Cron Jobs
- Supports real-time webhooks for instant updates

## 🚀 Quick Setup

### 1. Get YouTube API Credentials

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable the **YouTube Data API v3**
4. Create credentials (API Key)
5. Find your YouTube Channel ID at [Comment Picker](https://commentpicker.com/youtube-channel-id.php)

### 2. Configure Environment Variables

Create a `.env.local` file in your project root:

```bash
# YouTube API Configuration
YOUTUBE_API_KEY=your_youtube_api_key_here
YOUTUBE_CHANNEL_ID=your_youtube_channel_id_here

# Optional: For webhook notifications
YOUTUBE_WEBHOOK_SECRET=your_webhook_secret_here
YOUTUBE_VERIFY_TOKEN=pulsebeat-verify-token

# Required for cron jobs
CRON_SECRET=your_random_secret_here
```

### 3. Run Setup Script (Optional)

```bash
node scripts/setup-youtube-sync.js
```

This interactive script will help you configure everything.

### 4. Deploy to Vercel

1. Push your code to GitHub
2. Connect to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

The cron job will automatically start running every hour.

## 🔧 Manual Testing

### Test the Sync API

```bash
# Using environment variables
curl https://your-domain.com/api/youtube/sync

# Using custom credentials
curl -X POST https://your-domain.com/api/youtube/sync \
  -H "Content-Type: application/json" \
  -d '{"apiKey":"your_key","channelId":"your_channel","maxResults":5}'
```

### Admin Interface

Visit `/admin/youtube-sync` on your deployed site to:
- Test sync with custom credentials
- View sync results
- Monitor new videos

## 📋 How It Works

### Video Categorization

Videos are automatically categorized based on content:

- **Originals**: PULSEBEAT WITH GREG DUNMORE episodes, original programming
- **Celebrities**: Celebrity interviews, exclusive content
- **Culture**: News, culture, Detroit content, music, civil rights

### Tag Generation

Tags are automatically generated based on:
- Video title and description
- Existing YouTube tags
- Content analysis
- Category-specific tags

### Sync Process

1. **Hourly Cron Job**: Checks for new videos every hour
2. **Webhook Support**: Real-time notifications when videos are uploaded
3. **Duplicate Prevention**: Skips videos already in the system
4. **Automatic Categorization**: Analyzes content to determine category
5. **Metadata Extraction**: Gets duration, views, likes, thumbnails

## 🔗 API Endpoints

### `/api/youtube/sync`
- **GET**: Trigger sync using environment variables
- **POST**: Sync with custom credentials
- **Body**: `{apiKey, channelId, maxResults}`

### `/api/youtube/webhook`
- **POST**: Handle YouTube webhook notifications
- **GET**: Verify webhook subscriptions

### `/api/cron/youtube-sync`
- **GET**: Cron job endpoint (runs every hour)
- **Auth**: Requires `CRON_SECRET` in Authorization header

## 🎛️ Configuration Options

### Vercel Cron Schedule

Edit `vercel.json` to change sync frequency:

```json
{
  "crons": [
    {
      "path": "/api/cron/youtube-sync",
      "schedule": "0 * * * *"  // Every hour
    }
  ]
}
```

Schedule options:
- `"0 * * * *"` - Every hour
- `"0 */6 * * *"` - Every 6 hours
- `"0 0 * * *"` - Daily at midnight

### Video Processing Limits

- **Max Results**: Default 10 videos per sync
- **Description Length**: Truncated to 500 characters
- **Tag Limit**: Maximum 20 tags per video
- **Duration**: Automatically formatted (e.g., "15:30")

## 🔒 Security

### API Key Protection
- Never commit API keys to version control
- Use environment variables only
- Rotate keys regularly

### Webhook Security
- Verify webhook signatures
- Use HTTPS endpoints only
- Implement rate limiting

### Cron Job Security
- Requires `CRON_SECRET` for authentication
- Vercel handles cron job execution securely

## 🐛 Troubleshooting

### Common Issues

1. **"API key not configured"**
   - Check environment variables in Vercel dashboard
   - Ensure `YOUTUBE_API_KEY` is set

2. **"Channel not found"**
   - Verify channel ID is correct
   - Check if channel is public

3. **"No new videos found"**
   - Videos might already be synced
   - Check if videos are public
   - Verify API quota limits

4. **Cron job not running**
   - Check Vercel deployment logs
   - Verify `CRON_SECRET` is set
   - Ensure `vercel.json` is deployed

### Debug Mode

Enable debug logging by adding to environment:

```bash
DEBUG=youtube-sync
```

### Manual Sync

Use the admin interface at `/admin/youtube-sync` to:
- Test with custom credentials
- View detailed error messages
- Monitor sync results

## 📊 Monitoring

### Sync Results

Each sync returns:
```json
{
  "success": true,
  "newVideosCount": 2,
  "newVideos": [...],
  "message": "Successfully synced 2 new videos"
}
```

### Logs

Check Vercel function logs for:
- Sync execution times
- API quota usage
- Error details
- New video additions

## 🔄 Webhook Setup (Optional)

For real-time notifications:

1. **YouTube API Console**
   - Set up PubSubHubbub subscription
   - Use webhook URL: `https://your-domain.com/api/youtube/webhook`
   - Verify token: `pulsebeat-verify-token`

2. **Benefits**
   - Instant sync when videos are uploaded
   - No waiting for hourly cron job
   - Better user experience

## 🎉 Success!

Once set up, your website will automatically:
- ✅ Sync new YouTube videos every hour
- ✅ Categorize videos intelligently
- ✅ Generate appropriate tags
- ✅ Update your video collection
- ✅ Keep content fresh and current

Your audience will always see the latest content from your YouTube channel!
