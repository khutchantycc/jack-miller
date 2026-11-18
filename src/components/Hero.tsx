import { formatNumber } from '../utils/format';

interface HeroProps {
  channelInfo: {
    title: string;
    subscriberCount: string;
    videoCount: string;
    viewCount: string;
  } | null;
  statusText: string;
  totalVideos: number;
  searchQuery: string;
  onSearchChange: (value: string) => void;
  currentSort: string;
  onSortChange: (sort: string) => void;
}

const sortOptions = [
  { label: 'Newest', value: 'date-desc' },
  { label: 'Oldest', value: 'date-asc' },
  { label: 'Most Viewed', value: 'views-desc' },
];

export default function Hero({
  channelInfo,
  statusText,
  totalVideos,
  searchQuery,
  onSearchChange,
  currentSort,
  onSortChange,
}: HeroProps) {
  return (
    <section className="hero-bg pt-32 pb-16 relative">
      <div className="max-w-7xl mx-auto px-6 text-center">
        {/* Status Badge */}
        <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-6">
          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
          <span className="text-sm text-gray-300">{statusText}</span>
        </div>

        {/* Title */}
        <h1 className="font-display text-5xl md:text-7xl font-bold mb-4">
          All <span className="gradient-text">Videos</span>
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-8">
          Every video from the channel — fetched live from YouTube.
        </p>

        {/* Channel Stats */}
        <div className="flex flex-wrap justify-center gap-6 mb-8">
          <div className="glass px-6 py-3 rounded-2xl">
            <div className="text-2xl font-display font-bold">
              {channelInfo ? formatNumber(channelInfo.subscriberCount) : '—'}
            </div>
            <div className="text-xs text-gray-500">Subscribers</div>
          </div>
          <div className="glass px-6 py-3 rounded-2xl">
            <div className="text-2xl font-display font-bold">
              {channelInfo ? formatNumber(channelInfo.videoCount) : '—'}
            </div>
            <div className="text-xs text-gray-500">Videos</div>
          </div>
          <div className="glass px-6 py-3 rounded-2xl">
            <div className="text-2xl font-display font-bold">
              {channelInfo ? formatNumber(channelInfo.viewCount) : '—'}
            </div>
            <div className="text-xs text-gray-500">Total Views</div>
          </div>
        </div>

        {/* Search */}
        <div className="max-w-xl mx-auto relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search videos..."
            className="w-full glass rounded-full px-6 py-4 pl-12 text-white placeholder-gray-500 focus:outline-none focus:border-yt/50 transition-all bg-transparent"
          />
          <svg
            className="w-5 h-5 text-gray-500 absolute left-5 top-1/2 -translate-y-1/2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        {/* Sort Buttons */}
        <div className="flex justify-center gap-2 mt-6">
          {sortOptions.map((opt) => (
            <button
              key={opt.value}
              onClick={() => onSortChange(opt.value)}
              className={`glass px-4 py-2 rounded-full text-sm transition-all cursor-pointer ${
                currentSort === opt.value
                  ? 'bg-yt text-white'
                  : 'hover:bg-white/10'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
