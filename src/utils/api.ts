export const CHANNEL_ID = 'UCFW399C6JkpIkSnUQ0LYJ_Q';
const API_KEY = 'AIzaSyChjTCnutg0bvqODaAM9u3009ixCIsJTBA';

export interface ChannelInfo {
  title: string;
  subscriberCount: string;
  videoCount: string;
  viewCount: string;
  description: string;
  thumbnail: string;
  banner: string;
  publishedAt: string;
}

export interface VideoItem {
  id: { videoId: string };
  snippet: {
    title: string;
    publishedAt: string;
    description: string;
    thumbnails: {
      maxres?: { url: string };
      high?: { url: string };
      medium?: { url: string };
      default?: { url: string };
    };
  };
  _views?: number;
  _likes?: number;
  _comments?: number;
}

export interface VideoStats {
  [videoId: string]: {
    viewCount: string;
    likeCount?: string;
    commentCount?: string;
  };
}

export async function apiCall(endpoint: string, params: Record<string, string>): Promise<any> {
  const url = new URL(`https://www.googleapis.com/youtube/v3/${endpoint}`);
  url.searchParams.set('key', API_KEY);
  Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
  const res = await fetch(url);
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error?.message || 'API request failed');
  }
  return res.json();
}

export async function fetchChannelInfo(): Promise<ChannelInfo> {
  const data = await apiCall('channels', {
    part: 'snippet,statistics,brandingSettings',
    id: CHANNEL_ID,
  });
  if (!data.items || data.items.length === 0) throw new Error('Channel not found');
  const ch = data.items[0];
  return {
    title: ch.snippet.title,
    subscriberCount: ch.statistics.subscriberCount,
    videoCount: ch.statistics.videoCount,
    viewCount: ch.statistics.viewCount,
    description: ch.snippet.description || '',
    thumbnail: ch.snippet.thumbnails?.high?.url || ch.snippet.thumbnails?.default?.url || '',
    banner: ch.brandingSettings?.image?.bannerExternalUrl || '',
    publishedAt: ch.snippet.publishedAt,
  };
}

export async function fetchAllVideos(
  onProgress?: (count: number) => void
): Promise<VideoItem[]> {
  let pageToken = '';
  let items: VideoItem[] = [];
  do {
    const data = await apiCall('search', {
      part: 'snippet',
      channelId: CHANNEL_ID,
      type: 'video',
      order: 'date',
      maxResults: '50',
      pageToken: pageToken,
    });
    items = items.concat(data.items);
    pageToken = data.nextPageToken || '';
    onProgress?.(items.length);
  } while (pageToken);
  return items;
}

export async function fetchVideoStats(
  videoIds: string[],
  onProgress?: (pct: number) => void
): Promise<VideoStats> {
  const batches: string[][] = [];
  for (let i = 0; i < videoIds.length; i += 50) {
    batches.push(videoIds.slice(i, i + 50));
  }
  const allStats: VideoStats = {};
  for (let i = 0; i < batches.length; i++) {
    const batch = batches[i];
    const data = await apiCall('videos', {
      part: 'statistics',
      id: batch.join(','),
    });
    data.items.forEach((v: any) => {
      allStats[v.id] = v.statistics;
    });
    onProgress?.(((i + 1) / batches.length) * 100);
  }
  return allStats;
}
