import { useState, useEffect, useCallback, useMemo } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import VideoGrid from './components/VideoGrid';
import ApiModal from './components/ApiModal';
import ProgressBar from './components/ProgressBar';
import {
  fetchChannelInfo,
  fetchAllVideos,
  fetchVideoStats,
  getApiKey,
  ChannelInfo,
  VideoItem,
} from './utils/api';

interface ProcessedVideo {
  id: string;
  title: string;
  publishedAt: string;
  thumbnail: string;
  views: number;
}

export default function App() {
  const [channelInfo, setChannelInfo] = useState<ChannelInfo | null>(null);
  const [videos, setVideos] = useState<ProcessedVideo[]>([]);
  const [rawVideos, setRawVideos] = useState<VideoItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [loaderText, setLoaderText] = useState('Loading videos...');
  const [error, setError] = useState<string | null>(null);
  const [statusText, setStatusText] = useState('Connecting to YouTube...');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentSort, setCurrentSort] = useState('date-desc');
  const [apiModalOpen, setApiModalOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showProgress, setShowProgress] = useState(false);

  const init = useCallback(async () => {
    setLoading(true);
    setError(null);
    setVideos([]);
    setShowProgress(true);
    setProgress(10);

    if (!getApiKey()) {
      setLoading(false);
      setApiModalOpen(true);
      return;
    }

    try {
      const info = await fetchChannelInfo();
      setChannelInfo(info);
      setStatusText(`Connected to ${info.title}`);
      setProgress(20);

      setLoaderText('Loading videos...');
      const allVids = await fetchAllVideos((count) => {
        setLoaderText(`Loading... ${count} videos found`);
      });
      setRawVideos(allVids);
      setProgress(50);

      setLoaderText(`Fetching view counts for ${allVids.length} videos...`);
      try {
        const ids = allVids.map((v) => v.id?.videoId).filter(Boolean);
        const stats = await fetchVideoStats(ids, (pct) => {
          setProgress(50 + pct * 0.5);
        });
        allVids.forEach((v) => {
          const vid = v.id?.videoId;
          v._views = parseInt(stats[vid]?.viewCount || '0');
        });
      } catch (e) {
        console.warn('Could not fetch view counts:', e);
      }

      setProgress(100);
      setTimeout(() => setShowProgress(false), 500);

      // Process videos
      const processed = allVids
        .map((item) => ({
          id: item.id?.videoId,
          title: item.snippet.title,
          publishedAt: item.snippet.publishedAt,
          thumbnail:
            item.snippet.thumbnails?.maxres?.url ||
            item.snippet.thumbnails?.high?.url ||
            item.snippet.thumbnails?.medium?.url ||
            '',
          views: item._views || 0,
        }))
        .filter((v) => v.id);

      setVideos(processed);
      setStatusText(`${processed.length} videos loaded ✓`);
    } catch (err: any) {
      console.error(err);
      if (err.message === 'NO_KEY') {
        setApiModalOpen(true);
      } else {
        setError(err.message || 'Failed to load videos');
        setStatusText('Error loading videos');
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    init();
  }, [init]);

  const filteredAndSortedVideos = useMemo(() => {
    let filtered = [...videos];

    // Filter by search
    if (searchQuery) {
      filtered = filtered.filter((v) =>
        v.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Sort
    filtered.sort((a, b) => {
      if (currentSort === 'date-desc')
        return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
      if (currentSort === 'date-asc')
        return new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime();
      if (currentSort === 'views-desc') return (b.views || 0) - (a.views || 0);
      return 0;
    });

    return filtered;
  }, [videos, searchQuery, currentSort]);

  const handleSaveApiKey = () => {
    init();
  };

  return (
    <div className="text-white min-h-screen">
      <Navbar
        channelName={channelInfo?.title || 'My Channel'}
        onOpenApiModal={() => setApiModalOpen(true)}
      />

      <div className="relative">
        <ProgressBar progress={progress} visible={showProgress} />
      </div>

      <Hero
        channelInfo={channelInfo}
        statusText={statusText}
        totalVideos={videos.length}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        currentSort={currentSort}
        onSortChange={setCurrentSort}
      />

      <VideoGrid
        videos={filteredAndSortedVideos}
        loading={loading}
        loaderText={loaderText}
        error={error}
        onRetry={() => setApiModalOpen(true)}
      />

      <footer className="border-t border-white/5 py-8 text-center text-gray-500 text-sm">
        <p>© 2026 My Channel • Videos loaded live from YouTube</p>
      </footer>

      <ApiModal
        isOpen={apiModalOpen}
        onClose={() => setApiModalOpen(false)}
        onSave={handleSaveApiKey}
      />
    </div>
  );
}
