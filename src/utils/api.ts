export const CHANNEL_ID = 'UCFW399C6JkpIkSnUQ0LYJ_Q';
export const DEFAULT_API_KEY = 'AIzaSyChjTCnutg0bvqODaAM9u3009ixCIsJTBA';

export interface ChannelInfo {
  title: string;
  subscriberCount: string;
  videoCount: string;
  viewCount: string;
}

export interface VideoItem {
  id: { videoId: string };
  snippet: {
    title: string;
    publishedAt: string;
    thumbnails: {
      maxres?: { url: string };
      high?: { url: string };
      medium?: { url: string };
    };
  };
  _views?: number;
}

export interface VideoStats {
  [videoId: string]: {
    viewCount: string;
    likeCount?: string;
    commentCount?: string;
  };
}

export function getApiKey(): string {
  return localStorage.getItem('yt_api_key') || DEFAULT_API_KEY;
}

export function setApiKey(key: string): void {
  localStorage.setItem('yt_api_key', key);
}

export async function apiCall(endpoint: string, params: Record<string, string>): Promise<any> {
  const key = getApiKey();
  if (!key) throw new Error('NO_KEY');
  const url = new URL(`https://www.googleapis.com/youtube/v3/${endpoint}`);
  url.searchParams.set('key', key);
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
    part: 'snippet,statistics',
    id: CHANNEL_ID,
  });
  if (!data.items || data.items.length === 0) throw new Error('Channel not found');
  const ch = data.items[0];
  return {
    title: ch.snippet.title,
    subscriberCount: ch.statistics.subscriberCount,
    videoCount: ch.statistics.videoCount,
    viewCount: ch.statistics.viewCount,
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
