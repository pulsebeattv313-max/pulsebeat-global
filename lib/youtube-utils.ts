// YouTube API types
export interface YouTubeSearchItem {
  id: {
    videoId: string;
  };
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
}

export interface YouTubeVideo {
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

export interface YouTubeSearchResponse {
  items: YouTubeSearchItem[];
  nextPageToken?: string;
}

export interface YouTubeVideoResponse {
  items: YouTubeVideo[];
  nextPageToken?: string;
}

// Video categorization logic
export function categorizeVideo(video: YouTubeVideo): string {
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
export function generateTags(video: YouTubeVideo, category: string): string[] {
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
export function generateVideoId(category: string, existingVideos: any[]): string {
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
export function formatDuration(duration: string): string {
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
