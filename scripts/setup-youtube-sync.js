#!/usr/bin/env node

/**
 * YouTube Sync Setup Script
 * 
 * This script helps you set up automatic YouTube video synchronization
 * for your Pulsebeat Global website.
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(prompt) {
  return new Promise((resolve) => {
    rl.question(prompt, resolve);
  });
}

async function setupYouTubeSync() {
  console.log('🎬 YouTube Sync Setup for Pulsebeat Global\n');
  console.log('This script will help you configure automatic YouTube video synchronization.\n');

  // Check if .env.local exists
  const envPath = path.join(process.cwd(), '.env.local');
  const envExists = fs.existsSync(envPath);
  
  let envContent = '';
  if (envExists) {
    envContent = fs.readFileSync(envPath, 'utf8');
    console.log('✅ Found existing .env.local file');
  } else {
    console.log('📝 Creating new .env.local file');
  }

  // Get YouTube API Key
  console.log('\n📋 Step 1: YouTube API Configuration');
  console.log('You need a YouTube Data API v3 key. Get one at: https://console.cloud.google.com/');
  
  const apiKey = await question('Enter your YouTube API Key: ');
  if (!apiKey) {
    console.log('❌ API Key is required');
    process.exit(1);
  }

  // Get Channel ID
  console.log('\n📋 Step 2: YouTube Channel ID');
  console.log('Find your channel ID at: https://commentpicker.com/youtube-channel-id.php');
  
  const channelId = await question('Enter your YouTube Channel ID: ');
  if (!channelId) {
    console.log('❌ Channel ID is required');
    process.exit(1);
  }

  // Optional webhook secret
  const webhookSecret = await question('Enter webhook secret (optional, press Enter to skip): ');

  // Update or create .env.local
  const newEnvVars = [
    `YOUTUBE_API_KEY=${apiKey}`,
    `YOUTUBE_CHANNEL_ID=${channelId}`,
    webhookSecret ? `YOUTUBE_WEBHOOK_SECRET=${webhookSecret}` : '',
    `CRON_SECRET=${generateRandomSecret()}`,
    `YOUTUBE_VERIFY_TOKEN=pulsebeat-verify-token`
  ].filter(Boolean);

  // Merge with existing content
  const existingLines = envContent.split('\n').filter(line => 
    !line.startsWith('YOUTUBE_') && !line.startsWith('CRON_SECRET=')
  );
  
  const finalContent = [...existingLines, ...newEnvVars].join('\n');
  fs.writeFileSync(envPath, finalContent);

  console.log('\n✅ Environment variables configured');

  // Test the API connection
  console.log('\n🧪 Testing YouTube API connection...');
  try {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/channels?key=${apiKey}&id=${channelId}&part=snippet`
    );
    
    if (response.ok) {
      const data = await response.json();
      if (data.items && data.items.length > 0) {
        const channel = data.items[0];
        console.log(`✅ Connected to channel: ${channel.snippet.title}`);
      } else {
        console.log('❌ Channel not found');
        process.exit(1);
      }
    } else {
      console.log(`❌ API connection failed: ${response.status}`);
      process.exit(1);
    }
  } catch (error) {
    console.log(`❌ API test failed: ${error.message}`);
    process.exit(1);
  }

  // Setup instructions
  console.log('\n🎉 Setup Complete!\n');
  console.log('Next steps:');
  console.log('1. Deploy your site to Vercel');
  console.log('2. Add environment variables to Vercel dashboard');
  console.log('3. The cron job will automatically sync videos every hour');
  console.log('4. You can manually trigger sync at: /api/youtube/sync');
  
  console.log('\n📚 Optional: YouTube Webhook Setup');
  console.log('For real-time notifications when videos are uploaded:');
  console.log('1. Go to YouTube API Console');
  console.log('2. Set up PubSubHubbub subscription');
  console.log(`3. Use webhook URL: https://your-domain.com/api/youtube/webhook`);
  console.log(`4. Verify token: pulsebeat-verify-token`);

  rl.close();
}

function generateRandomSecret() {
  return require('crypto').randomBytes(32).toString('hex');
}

// Run the setup
setupYouTubeSync().catch(console.error);
